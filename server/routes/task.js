import express from "express";
import { addTask, getTasks, toggleTask } from "../controllers/task.js";
import auth from "../middleware/auth.js";

const router = express.Router();
router.post("/", auth, addTask);
router.get("/", auth, getTasks);
router.patch("/:id", auth, toggleTask);

export default router;