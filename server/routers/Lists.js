const express = require("express");
const router = express.Router({ mergeParams: true });
const tasksRouter = require("./Tasks");
const { Lists } = require("../models");
const { validateToken, validateBody, imageUpload } = require("../middlewares");
const { createDir, deleteDir } = require("../utils/dirUtils");
const Joi = require("joi");

const path = require("path");
const fs = require("fs");

// Joi Scheme
const listSchema = Joi.object({
  name: Joi.string().max(26),
});

// Protect all routes with JWT
router.use(validateToken);

// Get all lists for user
router.get("/", async (req, res, next) => {
  try {
    const { userId } = req.user;
    const lists = await Lists.findAll({
      where: { UserId: userId },
      order: [["createdAt", "DESC"]],
    });
    res.json(lists);
  } catch (err) {
    next(err);
  }
});

// Get single list
router.get("/:listId", async (req, res, next) => {
  try {
    const { userId } = req.user;
    const { listId } = req.params;
    const list = await Lists.findOne({
      where: { listId: listId, UserId: userId },
    });
    if (!list) return res.status(404).json({ error: "List not found" });
    res.json(list);
  } catch (err) {
    next(err);
  }
});

// Create list
router.post("/", validateBody(listSchema), async (req, res, next) => {
  try {
    const { userId } = req.user;
    const newList = await Lists.create({ ...req.body, UserId: userId });
    return res.status(201).json(newList);
  } catch (err) {
    next(err);
  }
});

// Update list
router.patch("/:listId", validateBody(listSchema), async (req, res, next) => {
  try {
    const { userId } = req.user;
    const { listId } = req.params;
    const { name } = req.body;
    const list = await Lists.findOne({
      where: { listId: listId, UserId: userId },
    });
    if (!list) return res.status(404).json({ error: "List not found" });

    list.name = name;
    await list.save();
    res.json(list);
  } catch (err) {
    next(err);
  }
});

// Delete List
router.delete("/:listId", async (req, res, next) => {
  try {
    const { userId } = req.user;
    const { listId } = req.params;

    const list = await Lists.findOne({ where: { listId, UserId: userId } });
    if (!list) return res.status(404).json({ error: "List not found." });

    await deleteDir(`${userId}/lists/${listId}`);

    await Lists.destroy({ where: { listId, UserId: userId } });

    res.status(200).json("List successfully deleted.");
  } catch (err) {
    next(err);
  }
});

// Upload List image
router.post(
  "/:listId/image",
  validateToken,
  imageUpload.single("image"),
  async (req, res, next) => {
    try {
      if (!req.file) return res.status(400).json({ error: "No file uploaded" });

      const { userId } = req.user;
      const { listId } = req.params;

      const list = await Lists.findOne({
        where: { listId: listId, UserId: userId },
      });
      if (!list) return res.status(404).json({ error: "List not found" });

      const listDir = await createDir(`${userId}/lists/${listId}`);

      if (list.image) {
        const oldPath = path.join(listDir, path.basename(list.image));
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }

      const newFilePath = path.join(listDir, req.file.originalname);
      fs.renameSync(req.file.path, newFilePath);

      list.image = `/uploads/${userId}/lists/${list.listId}/${req.file.originalname}`;
      await list.save();

      res.json({
        message: "Image uploaded successfully",
        path: list.image,
      });
    } catch (error) {
      next(error);
    }
  }
);

// Delete List image
router.delete("/:listId/image", async (req, res, next) => {
  try {
    const { userId } = req.user;
    const { listId } = req.params;

    const list = await Lists.findOne({ where: { listId, UserId: userId } });
    if (!list) return res.status(404).json({ error: "List not found" });

    await deleteDir(`${userId}/lists/${listId}`);

    list.image = null;
    await list.save();

    res.status(200).json({ message: "List image deleted successfully" });
  } catch (err) {
    next(err);
  }
});

// Nested router for tasks
router.use("/:listId/tasks", tasksRouter);

module.exports = router;
