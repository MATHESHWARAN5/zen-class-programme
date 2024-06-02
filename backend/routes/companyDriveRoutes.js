const express = require('express');
const router = express.Router();
const CompanyDrive = require('../models/companyDriveModel');

// Get all company drives
router.get('/', async (req, res) => {
    try {
        const drives = await CompanyDrive.find().populate('students_appeared');
        res.json(drives);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get company drives by date range
router.get('/range', async (req, res) => {
    const { startDate, endDate } = req.query;
    try {
        const drives = await CompanyDrive.find({
            date: { $gte: new Date(startDate), $lte: new Date(endDate) }
        }).populate('students_appeared');
        res.json(drives);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create new company drive
router.post('/', async (req, res) => {
    const drive = new CompanyDrive({
        company_name: req.body.company_name,
        date: req.body.date,
        students_appeared: req.body.students_appeared
    });

    try {
        const newDrive = await drive.save();
        res.status(201).json(newDrive);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update company drive
router.put('/:id', async (req, res) => {
    try {
        const drive = await CompanyDrive.findById(req.params.id);
        if (drive == null) {
            return res.status(404).json({ message: 'Company drive not found' });
        }

        if (req.body.company_name != null) {
            drive.company_name = req.body.company_name;
        }
        if (req.body.date != null) {
            drive.date = req.body.date;
        }
        if (req.body.students_appeared != null) {
            drive.students_appeared = req.body.students_appeared;
        }

        const updatedDrive = await drive.save();
        res.json(updatedDrive);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete company drive
router.delete('/:id', async (req, res) => {
    try {
        const drive = await CompanyDrive.findById(req.params.id);
        if (drive == null) {
            return res.status(404).json({ message: 'Company drive not found' });
        }

        await drive.remove();
        res.json({ message: 'Company drive deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
