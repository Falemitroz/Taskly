const express = require("express");
const router = express.Router({ mergeParams: true });
const { Tasks } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");
const validateBody = require("../middlewares/ValidateBody");
const Joi = require("joi");

// Joi Schemes
const createSchema = Joi.object({
  title: Joi.string().max(50).required(),
  description: Joi.string().max(255).allow(""),
  status: Joi.boolean().default(false),
});

const updateSchema = Joi.object({
  title: Joi.string().max(50),
  description: Joi.string().max(255).allow(""),
  status: Joi.boolean().default(false),
});

// Protect all routes with JWT
router.use(validateToken);

// Get all Tasks for list
router.get("/", async (req, res, next) => {
  try {
    const { listId } = req.params;
    const tasks = await Tasks.findAll({
      where: { ListId: listId },
      order: [["createdAt", "ASC"]],
    });
    res.json(tasks);
  } catch (err) {
    next(err);
  }
});

// Get single Task
router.get("/:taskId", async (req, res, next) => {
  try {
    const { listId, taskId } = req.params;
    const task = await Tasks.findOne({
      where: { taskId: taskId, ListId: listId },
    });
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.json(task);
  } catch (err) {
    next(err);
  }
});

// Create Task
router.post("/", validateBody(createSchema), async (req, res, next) => {
  try {
    const { listId } = req.params;
    const task = await Tasks.create({ ...req.body, ListId: listId });
    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
});

// Update Task
router.patch("/:taskId", validateBody(updateSchema), async (req, res, next) => {
  try {
    const { listId, taskId } = req.params;
    const { title, description, status } = req.body;
    const task = await Tasks.findOne({
      where: { taskId: taskId, ListId: listId },
    });
    if (!task) return res.status(404).json({ error: "Task not found" });

    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (status !== undefined) task.status = status;

    await task.save();
    res.json(task);
  } catch (err) {
    next(err);
  }
});

// Delete Task
router.delete("/:taskId", async (req, res, next) => {
  try {
    const { listId, taskId } = req.params;

    const list = await Tasks.destroy({
      where: { taskId: taskId, ListId: listId },
    });

    if (list) {
      res.status(200).json("Task successfully deleted");
    } else {
      res.status(404).json({ message: "Task not found." });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
