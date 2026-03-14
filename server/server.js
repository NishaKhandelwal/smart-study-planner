import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

// connect to database
connectDB();

const app = express();

// middleware
app.use(cors());
app.use(express.json());
import subjectRoutes from "./routes/subject.js";
import taskRoutes from "./routes/task.js";

app.use("/api/subjects", subjectRoutes);
app.use("/api/tasks", taskRoutes);

// test route
app.get("/", (req, res) => {
  res.send("Study Planner API Running");
});

// auth routes
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});