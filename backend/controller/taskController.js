const Task = require('../model/taskModel'); // Assuming your model is defined in a file named task.js
const notifier = require('node-notifier');

// Create task
exports.createTask = async (req, res) => {
  try {
    const { title, description, deadline, status } = req.body;
    const task = await Task.create({ title, description, deadline, status });
    res.status(200).json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Read All tasks
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Read Single task
exports.getSingleTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByPk(id);
    if (!task) throw Error('task not found');
    res.json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update task
exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, deadline, status } = req.body;
    const task = await Task.findByPk(id);
    if (!task) throw Error('task not found');
    await task.update({ title, description, deadline, status });
    res.status(200).json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete task
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByPk(id);
    if (!task) throw Error('task not found');
    await task.destroy();
    res.json({ message: 'task deleted successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

