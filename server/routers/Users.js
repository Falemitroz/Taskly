const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { Users } = require("../models");
const listsRouter = require("./Lists");
const { validateToken, validateBody, imageUpload } = require("../middlewares");
const { createAccessToken, sendTokenCookie } = require("../utils/jwt");
const { createDir, deleteDir } = require("../utils/dirUtils");
const Joi = require("joi");

const path = require("path");
const fs = require("fs");

// Joi Schemes
const regSchema = Joi.object({
  firstName: Joi.string().min(3).max(15).required(),
  lastName: Joi.string().min(3).max(15).required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.empty": "Email cannot be empty",
      "string.email": "Please enter a valid email address",
    }),
  password: Joi.string().min(4).required(),
});

const loginSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.empty": "Email cannot be empty",
      "string.email": "Please enter a valid email address",
    }),
  password: Joi.string().required(),
});

const updateSchema = Joi.object({
  firstName: Joi.string().min(3).max(15),
  lastName: Joi.string().min(3).max(15),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .messages({
      "string.email": "Please enter a valid email address",
    }),
  password: Joi.string().min(4),
});

// Registration
router.post("/register", validateBody(regSchema), async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const existingUser = await Users.findOne({ where: { email } });
    if (existingUser)
      return res.status(409).json({ error: "User already exist." });

    const hash = await bcrypt.hash(password, 10);
    const newUser = await Users.create({
      firstName,
      lastName,
      email,
      password: hash,
    });

    await createDir(newUser.id);

    const accessToken = createAccessToken(newUser.id);
    sendTokenCookie(res, accessToken);

    res.status(201).json(accessToken);
  } catch (error) {
    next(error);
  }
});

// Login
router.post("/login", validateBody(loginSchema), async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ where: { email } });
    if (!user) return res.status(404).json({ error: "User not found." });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: "Invalid password." });

    const accessToken = createAccessToken(user.id);
    sendTokenCookie(res, accessToken);

    return res.status(200).json("Login successful");
  } catch (error) {
    next(error);
  }
});

// Get User informations
router.get("/me", validateToken, async (req, res, next) => {
  try {
    const { userId } = req.user;

    const user = await Users.findOne({
      where: { id: userId },
      attributes: ["firstName", "lastName", "email", "avatar"],
    });

    if (!user) return res.status(404).json("User not found.");

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

// Update User informations
router.patch(
  "/me",
  validateBody(updateSchema),
  validateToken,
  async (req, res, next) => {
    try {
      const { userId } = req.user;
      const { firstName, lastName, email, password } = req.body;

      const user = await Users.findOne({ where: { id: userId } });

      if (!user) return res.status(404).json("User not found.");

      if (firstName) user.firstName = firstName;
      if (lastName) user.lastName = lastName;
      if (email) user.email = email;
      if (password) {
        const hash = await bcrypt.hash(password, 10);
        user.password = hash;
      }

      await user.save();

      res.status(200).json("User updated");
    } catch (error) {
      next(error);
    }
  }
);

// Logout
router.post("/logout", (req, res) => {
  res.clearCookie("accessToken");
  return res.json({ message: "Logged out" });
});

// Upload Avatar image
router.post(
  "/avatar",
  validateToken,
  imageUpload.single("avatar"),
  async (req, res, next) => {
    try {
      if (!req.file)
        return res.status(400).json({ error: "No files uploaded" });

      const { userId } = req.user;
      const user = await Users.findByPk(userId);
      if (!user) return res.status(404).json({ error: "User not found" });

      const avatarDir = await createDir(`${userId}/avatar`);

      if (user.avatar) {
        const oldPath = path.join(avatarDir, path.basename(user.avatar));
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }

      const newFilePath = path.join(avatarDir, req.file.originalname);
      fs.renameSync(req.file.path, newFilePath);

      user.avatar = `/uploads/${userId}/avatar/${req.file.originalname}`;
      await user.save();

      res.json({
        message: "Avatar uploaded successfully",
        path: user.avatar,
      });
    } catch (error) {
      next(error);
    }
  }
);

// Delete Avatar
router.delete("/avatar", validateToken, async (req, res, next) => {
  try {
    const { userId } = req.user;

    const user = await Users.findByPk(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    if (!user.avatar)
      return res.status(404).json({ error: "User has no avatar to delete" });

    await deleteDir(`${userId}/avatar`);

    user.avatar = null;
    await user.save();

    res.status(200).json({ message: "Avatar deleted successfully." });
  } catch (err) {
    next(err);
  }
});

// Delete User
router.delete("/me", validateToken, async (req, res, next) => {
  try {
    const { userId } = req.user;

    const user = await Users.findByPk(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    await deleteDir(userId);

    await Users.destroy({ where: { id: userId } });

    res.clearCookie("accessToken");

    res.status(200).json({ message: "User deleted successfully." });
  } catch (err) {
    next(err);
  }
});

// Nested Router Lists
router.use("/lists", listsRouter);

module.exports = router;
