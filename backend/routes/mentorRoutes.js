const express = require('express');
const router = express.Router();
const Mentor = require('../models/mentorModel');

// Get all mentors
router.get('/', async (req, res) => {
    try {
        const mentors = await Mentor.find().populate('mentee_ids');
        res.json(mentors);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get mentor by ID
router.get('/:id', async (req, res) => {
    try {
        const mentor = await Mentor.findById(req.params.id).populate('mentee_ids');
        if (mentor == null) {
            return res.status(404).json({ message: 'Mentor not found' });
        }
        res.json(mentor);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create new mentor
router.post('/', async (req, res) => {
    const mentor = new Mentor({
        name: req.body.name,
        mentee_ids: req.body.mentee_ids
    });

    try {
        const newMentor = await mentor.save();
        res.status(201).json(newMentor);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update mentor
router.put('/:id', async (req, res) => {
    try {
        const mentor = await Mentor.findById(req.params.id);
        if (mentor == null) {
            return res.status(404).json({ message: 'Mentor not found' });
        }

        if (req.body.name != null) {
            mentor.name = req.body.name;
        }
        if (req.body.mentee_ids != null) {
            mentor.mentee_ids = req.body.mentee_ids;
        }

        const updatedMentor = await mentor.save();
        res.json(updatedMentor);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete mentor
router.delete('/:id', async (req, res) => {
    try {
        const mentor = await Mentor.findById(req.params.id);
        if (mentor == null) {
            return res.status(404).json({ message: 'Mentor not found' });
        }

        await mentor.remove();
        res.json({ message: 'Mentor deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
