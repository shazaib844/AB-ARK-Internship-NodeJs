import express from "express";
import { authenticate } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";
import upload from "../middleware/upload.middleware.js";
import {
  createIntern,
  getInterns,
  getInternById,
  updateIntern,
  deleteIntern,
} from "../controllers/intern.controller.js";

const router = express.Router();

router.post("/", authenticate, upload.single("profileImage"), createIntern);

router.get("/", authenticate, getInterns);

router.get("/:id", authenticate, getInternById);

router.patch("/:id", authenticate, upload.single("profileImage"), updateIntern);

router.delete("/:id", authenticate, authorize("ADMIN"), deleteIntern);

export default router;
