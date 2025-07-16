const mongoose = require('mongoose');

const BeneficiarySchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true, min: 0 },
    gender: { type: String, enum: ['male', 'female', 'other'], required: true },
    location: { type: String, required: true },
    notes: { type: String },
    isVerified: { type: Boolean, default: false },
    isFound: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Beneficiary', BeneficiarySchema);
