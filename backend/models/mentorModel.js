const mongoose = require('mongoose');

const mentorSchema = new mongoose.Schema({
    name: String,
    mentee_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('Mentor', mentorSchema);
