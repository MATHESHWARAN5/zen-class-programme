const express = require('express');
const router = express.Router();
const Attendance = require('../models/attendanceModel');

// Get all attendance entries
router.get('/', async (req, res) => {
    try {
        const attendances = await Attendance.find();
        res.json(attendances);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get attendance by user ID
router.get('/user/:userId', async (req, res) => {
    try {
        const attendance = await Attendance.find({ user_id: req.params.userId });
        res.json(attendance);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create new attendance entry
router.post('/', async (req, res) => {
    const attendance = new Attendance({
        user_id: req.body.user_id,
        date: req.body.date,
        status: req.body.status
    });

    try {
        const newAttendance = await attendance.save();
        res.status(201).json(newAttendance);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update attendance entry
router.put('/:id', async (req, res) => {
    try {
        const attendance = await Attendance.findById(req.params.id);
        if (attendance == null) {
            return res.status(404).json({ message: 'Attendance entry not found' });
        }

        if (req.body.date != null) {
            attendance.date = req.body.date;
        }
        if (req.body.status != null) {
            attendance.status = req.body.status;
        }

        const updatedAttendance = await attendance.save();
        res.json(updatedAttendance);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete attendance entry
router.delete('/:id', async (req, res) => {
    try {
        const attendance = await Attendance.findById(req.params.id);
        if (attendance == null) {
            return res.status(404).json({ message: 'Attendance entry not found' });
        }

        await attendance.remove();
        res.json({ message: 'Attendance entry deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
