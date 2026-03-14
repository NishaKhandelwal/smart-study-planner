import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subjectId: { type: mongoose.Schema.Types.ObjectId, ref: "Subject" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  completed: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model("Task", TaskSchema);