const express = require('express');
const router = express.Router();
const SiteVisit = require('../models/SiteVisit');

// Get all site visits
router.get('/', async (req, res) => {
    try {
        const siteVisits = await SiteVisit.find();
        res.json(siteVisits);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add a new site visit
router.post('/', async (req, res) => {
    const siteVisit = new SiteVisit({
        client: req.body.client,
        date: req.body.date,
        time: req.body.time,
        location: req.body.location,
        budget:req.body.budget,
        notes:req.body.notes
    });

    try {
        const newSiteVisit = await siteVisit.save();
        res.status(201).json(newSiteVisit);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Edit a site visit
router.put('/:id', async (req, res) => {
    try {
        const updatedSiteVisit = await SiteVisit.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updatedSiteVisit);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a site visit
router.delete('/:id', async (req, res) => {
    try {
        await SiteVisit.findByIdAndDelete(req.params.id);
        res.json({ message: "Site visit deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
