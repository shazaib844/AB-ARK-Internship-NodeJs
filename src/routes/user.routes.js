import express from "express";
import { authenticate } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";
import {
  createUser,
  getUsers,
  getUserById,
  deleteUser,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/", createUser);
router.get("/", authenticate, getUsers);
router.get("/:id", authenticate, getUserById);
router.delete("/:id", authenticate, authorize("ADMIN"), deleteUser);

export default router;
