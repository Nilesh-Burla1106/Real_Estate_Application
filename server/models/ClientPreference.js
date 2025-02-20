const mongoose = require('mongoose');

const ClientPreferenceSchema = new mongoose.Schema({
    client: { type: String, required: true },
    budget: { type: String, required: true },
    propertyType: { type: String, required: true },
    location: { type: String, required: true },
});

module.exports = mongoose.model('ClientPreference', ClientPreferenceSchema);
