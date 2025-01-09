const Task = require('../models/Task');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

// Get Tasks
exports.getTasks = async (req, res) => {
    const token = req.headers.authorization;
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const tasks = await Task.find({ userId: decoded.userId });
        res.status(200).json(tasks);
    } catch (err) {
        res.status(401).json({ error: 'Unauthorized' });
    }
};

// Add Task
exports.addTask = async (req, res) => {
    const token = req.headers.authorization;
    const { title, category } = req.body;
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const newTask = new Task({ userId: decoded.userId, title, category });
        await newTask.save();
        res.status(201).json(newTask);
    } catch (err) {
        res.status(401).json({ error: 'Unauthorized' });
    }
};

// Update Task
exports.updateTask = async (req, res) => {
    const token = req.headers.authorization;
    const { id } = req.params;
    const { isCompleted } = req.body;
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const task = await Task.findOneAndUpdate(
            { _id: id, userId: decoded.userId },
            { isCompleted },
            { new: true }
        );
        if (!task) return res.status(404).json({ error: 'Task not found' });
        res.status(200).json(task);
    } catch (err) {
        res.status(401).json({ error: 'Unauthorized' });
    }
};

// Delete Task
exports.deleteTask = async (req, res) => {
    const token = req.headers.authorization;
    const { id } = req.params;
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const task = await Task.findOneAndDelete({ _id: id, userId: decoded.userId });
        if (!task) return res.status(404).json({ error: 'Task not found' });
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (err) {
        res.status(401).json({ error: 'Unauthorized' });
    }
};
