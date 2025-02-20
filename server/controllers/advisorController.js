// controllers/advisorController.js
exports.manageSite = async (req, res) => {
    const newSite = new Site(req.body);
    await newSite.save();
    res.json({ message: 'Site managed successfully' });
};

exports.submitInsights = async (req, res) => {
    const insight = new Insight(req.body);
    await insight.save();
    res.json({ message: 'Insight submitted successfully' });
};