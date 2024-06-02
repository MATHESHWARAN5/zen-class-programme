const mongoose = require('mongoose');

const codekataSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    problems_solved: Number
});

module.exports = mongoose.model('Codekata', codekataSchema);
