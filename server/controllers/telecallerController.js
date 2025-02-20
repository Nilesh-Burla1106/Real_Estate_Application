// controllers/telecallerController.js
exports.logCall = async (req, res) => {
    const newCall = new Call(req.body);
    await newCall.save();
    res.json({ message: 'Call logged successfully' });
};

exports.submitReport = async (req, res) => {
    const report = new Report(req.body);
    await report.save();
    res.json({ message: 'Report submitted successfully' });
};