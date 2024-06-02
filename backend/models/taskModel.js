const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    name: String,
    date: Date,
    is_submitted: Boolean,
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Task', taskSchema);
