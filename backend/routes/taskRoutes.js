const express = require('express');
const router = express.Router();
const Task = require('../models/taskModel');

// Get all tasks
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get task by user ID
router.get('/user/:userId', async (req, res) => {
    try {
        const tasks = await Task.find({ user_id: req.params.userId });
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create new task
router.post('/', async (req, res) => {
    const task = new Task({
        name: req.body.name,
        date: req.body.date,
        is_submitted: req.body.is_submitted,
        user_id: req.body.user_id
    });

    try {
        const newTask = await task.save();
        res.status(201).json(newTask);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update task
router.put('/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (task == null) {
            return res.status(404).json({ message: 'Task not found' });
        }

        if (req.body.name != null) {
            task.name = req.body.name;
        }
        if (req.body.date != null) {
            task.date = req.body.date;
        }
        if (req.body.is_submitted != null) {
            task.is_submitted = req.body.is_submitted;
        }

        const updatedTask = await task.save();
        res.json(updatedTask);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete task
router.delete('/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (task == null) {
            return res.status(404).json({ message: 'Task not found' });
        }

        await task.remove();
        res.json({ message: 'Task deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;

