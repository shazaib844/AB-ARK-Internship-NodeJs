import express from "express";
import userRoutes from "./src/routes/user.routes.js";
import authRoutes from "./src/routes/auth.routes.js";
import internRoutes from "./src/routes/intern.route.js";
import taskRoutes from "./src/routes/task.route.js";
import { errorHandler } from "./src/middleware/error.middleware.js";

const app = express();

app.use(express.json());

// app.use(express.urlencoded({ extended: true }));

app.use("/users", userRoutes);

app.use("/auth", authRoutes);

app.use("/interns", internRoutes);

app.use("/tasks", taskRoutes);

app.use("/uploads", express.static("uploads"));

app.use(errorHandler);

export default app;
