const express = require('express');
const router = express.Router();
const taskController = require('../controller/taskController');

// Routes
router.post('/create', taskController.createTask); // Create a new Task
router.get('/all', taskController.getAllTasks); // Get all Tasks
router.get('/:id', taskController.getSingleTask); // Get a single Task by ID
router.patch('/:id', taskController.updateTask); // Update a Task by ID
router.delete('/:id', taskController.deleteTask); // Delete a Task by ID

module.exports = router;
