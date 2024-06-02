const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    mentor_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Mentor' }
});

module.exports = mongoose.model('User', userSchema);
