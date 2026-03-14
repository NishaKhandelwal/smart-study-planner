import Subject from "../models/Subject.js";

// Create Subject
export const addSubject = async (req, res) => {
  try {
    const { name } = req.body;
    const subject = new Subject({ name, userId: req.user.id });
    await subject.save();
    res.status(201).json(subject);
  } catch (error) {
    res.status(500).json({ message: "Error adding subject" });
  }
};

// Get Subjects for user
export const getSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find({ userId: req.user.id });
    res.json(subjects);
  } catch (error) {
    res.status(500).json({ message: "Error fetching subjects" });
  }
};