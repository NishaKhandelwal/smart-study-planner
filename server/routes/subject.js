import express from "express";
import { addSubject, getSubjects } from "../controllers/subject.js";
import auth from "../middleware/auth.js";

const router = express.Router();
router.post("/", auth, addSubject);
router.get("/", auth, getSubjects);

export default router;