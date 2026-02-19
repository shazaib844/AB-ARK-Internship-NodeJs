import express from "express";
import userRoutes from "./src/routes/user.routes.js";
import authRoutes from "./src/routes/auth.routes.js";
import { errorHandler } from "./src/middleware/error.middleware.js";

const app = express();

app.use(express.json());

app.use("/users", userRoutes);

app.use("/auth", authRoutes);

app.use(errorHandler);

export default app;
