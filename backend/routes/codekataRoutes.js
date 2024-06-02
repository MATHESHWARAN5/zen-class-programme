const express = require('express');
const router = express.Router();
const Codekata = require('../models/codekataModel');

// Get all codekata entries
router.get('/', async (req, res) => {
    try {
        const codekatas = await Codekata.find();
        res.json(codekatas);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get codekata by user ID
router.get('/user/:userId', async (req, res) => {
    try {
        const codekata = await Codekata.find({ user_id: req.params.userId });
        res.json(codekata);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create new codekata entry
router.post('/', async (req, res) => {
    const codekata = new Codekata({
        user_id: req.body.user_id,
        problems_solved: req.body.problems_solved
    });

    try {
        const newCodekata = await codekata.save();
        res.status(201).json(newCodekata);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update codekata entry
router.put('/:id', async (req, res) => {
    try {
        const codekata = await Codekata.findById(req.params.id);
        if (codekata == null) {
            return res.status(404).json({ message: 'Codekata entry not found' });
        }

        if (req.body.problems_solved != null) {
            codekata.problems_solved = req.body.problems_solved;
        }

        const updatedCodekata = await codekata.save();
        res.json(updatedCodekata);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete codekata entry
router.delete('/:id', async (req, res) => {
    try {
        const codekata = await Codekata.findById(req.params.id);
        if (codekata == null) {
            return res.status(404).json({ message: 'Codekata entry not found' });
        }

        await codekata.remove();
        res.json({ message: 'Codekata entry deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
