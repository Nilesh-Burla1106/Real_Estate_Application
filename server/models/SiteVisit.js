const mongoose = require('mongoose');

const siteVisitSchema = new mongoose.Schema({
    client: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true }, // or Date if you prefer
    location: { type: String, required: true },
    budget: { type: Number, required: true }, // Change type if necessary
    notes: { type: String, required: false } // Optional field
});

module.exports = mongoose.model('SiteVisit', siteVisitSchema);
