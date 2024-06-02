const mongoose = require('mongoose');

const companyDriveSchema = new mongoose.Schema({
    company_name: String,
    date: Date,
    students_appeared: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('CompanyDrive', companyDriveSchema);
