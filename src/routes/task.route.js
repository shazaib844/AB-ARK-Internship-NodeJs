import express from "express";
import { authenticate } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";
import upload from "../middleware/upload.middleware.js";
import {
  createTask,
  getTasks,
  getTaskById,
  updateTaskStatus,
  deleteTask,
  downloadTaskAttachment,
} from "../controllers/task.controller.js";

const router = express.Router();

router.post("/", authenticate, upload.single("attachment"), createTask);

router.get("/", authenticate, getTasks);

router.get("/:id", authenticate, getTaskById);

router.get("/:id/attachment", authenticate, downloadTaskAttachment);

router.patch("/:id/status", authenticate, updateTaskStatus);

router.delete("/:id", authenticate, authorize("ADMIN"), deleteTask);

export default router;
