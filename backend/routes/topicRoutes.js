const express = require('express');
const router = express.Router();
const Topic = require('../models/topicModel');

// Get all topics
router.get('/', async (req, res) => {
    try {
        const topics = await Topic.find();
        res.json(topics);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get topic by ID
router.get('/:id', async (req, res) => {
    try {
        const topic = await Topic.findById(req.params.id);
        if (topic == null) {
            return res.status(404).json({ message: 'Topic not found' });
        }
        res.json(topic);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create new topic
router.post('/', async (req, res) => {
    const topic = new Topic({
        name: req.body.name,
        date: req.body.date
    });

    try {
        const newTopic = await topic.save();
        res.status(201).json(newTopic);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update topic
router.put('/:id', async (req, res) => {
    try {
        const topic = await Topic.findById(req.params.id);
        if (topic == null) {
            return res.status(404).json({ message: 'Topic not found' });
        }

        if (req.body.name != null) {
            topic.name = req.body.name;
        }
        if (req.body.date != null) {
            topic.date = req.body.date;
        }

        const updatedTopic = await topic.save();
        res.json(updatedTopic);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete topic
router.delete('/:id', async (req, res) => {
    try {
        const topic = await Topic.findById(req.params.id);
        if (topic == null) {
            return res.status(404).json({ message: 'Topic not found' });
        }

        await topic.remove();
        res.json({ message: 'Topic deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
