import Task from "../models/Task.js";

// ✅ Create Task
export const addTask = async (req, res) => {
  try {
    const { title, subjectId, dueDate, priority } = req.body;

    const task = new Task({
      title,
      subjectId,
      userId: req.user.id,
      dueDate,
      priority
    });

    await task.save();

    res.status(201).json(task);

  } catch (error) {
    res.status(500).json({ message: "Error adding task" });
  }
};

// ✅ Get Tasks
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id })
      .populate("subjectId");

    res.json(tasks);

  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks" });
  }
};

// ✅ Toggle task completion
export const toggleTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    task.completed = !task.completed;

    await task.save();

    res.json(task);

  } catch (error) {
    res.status(500).json({ message: "Error updating task" });
  }
};

// ✅ Delete Task
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};