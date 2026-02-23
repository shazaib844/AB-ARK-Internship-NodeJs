import prisma from "../config/prisma.js";
import { streamFile } from "../utils/streamFile.js";

export const createTask = async (req, res, next) => {
  try {
    const { title, description, internId } = req.body;
    const attachment = req.file ? req.file.path : null;

    const intern = await prisma.intern.findUnique({
      where: { id: Number(internId) },
    });
    if (!intern) return res.status(404).json({ message: "Intern not found" });

    const task = await prisma.task.create({
      data: {
        title,
        description,
        internId: intern.id,
        attachment,
      },
    });

    res.status(201).json({ message: "Task assigned", task });
  } catch (error) {
    next(error);
  }
};

export const getTasks = async (req, res, next) => {
  try {
    const tasks = await prisma.task.findMany({
      include: { intern: true },
    });
    res.status(200).json({ tasks });
  } catch (error) {
    next(error);
  }
};

export const getTaskById = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const task = await prisma.task.findUnique({
      where: { id },
      include: { intern: true },
    });

    if (!task) return res.status(404).json({ message: "Task not found" });

    res.status(200).json({ task });
  } catch (error) {
    next(error);
  }
};

export const updateTaskStatus = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const { status } = req.body;

    const task = await prisma.task.findUnique({ where: { id } });
    if (!task) return res.status(404).json({ message: "Task not found" });

    const updated = await prisma.task.update({
      where: { id },
      data: { status },
    });

    res.status(200).json({ message: "Task status updated", task: updated });
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const task = await prisma.task.findUnique({ where: { id } });
    if (!task) return res.status(404).json({ message: "Task not found" });

    await prisma.task.delete({ where: { id } });

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const downloadTaskAttachment = async (req, res, next) => {
  try {
    const taskId = Number(req.params.id);
    const task = await prisma.task.findUnique({ where: { id: taskId } });

    if (!task || !task.attachment) {
      return res.status(404).json({ message: "Attachment not found" });
    }

    streamFile(task.attachment, res);
  } catch (error) {
    next(error);
  }
};
