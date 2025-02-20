const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin','manager','telecaller', 'advisor','accountant'], required: true },
    mobile: { type: String },
    photo: { type: String },
    profileComplete: { type: Boolean, default: false },  // Track if profile is complete
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date }
});

const EmployeeModel = mongoose.model('Employee', employeeSchema);
module.exports = EmployeeModel;

