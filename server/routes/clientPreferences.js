const express = require('express');
const router = express.Router();
const ClientPreference = require('../models/ClientPreference');

// Get all client preferences
router.get('/', async (req, res) => {
    try {
        const clientPreferences = await ClientPreference.find();
        res.json(clientPreferences);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add a new client preference
router.post('/', async (req, res) => {
    const clientPreference = new ClientPreference({
        client: req.body.client,
        budget: req.body.budget,
        propertyType: req.body.propertyType,
        location: req.body.location,
    });

    try {
        const newClientPreference = await clientPreference.save();
        res.status(201).json(newClientPreference);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Edit a client preference
router.put('/:id', async (req, res) => {
    try {
        const updatedClientPreference = await ClientPreference.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updatedClientPreference);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a client preference
router.delete('/:id', async (req, res) => {
    try {
        await ClientPreference.findByIdAndDelete(req.params.id);
        res.json({ message: "Client preference deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
