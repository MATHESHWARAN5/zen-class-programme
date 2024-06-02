const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema({
    name: String,
    date: Date
});

module.exports = mongoose.model('Topic', topicSchema);
