// routes/projectRoutes.js
const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

// Route to get all projects (both ongoing and completed)
router.get('/all', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

// Route to add a new project
router.post('/add', async (req, res) => {
  const { name, description, details } = req.body;

  const newProject = new Project({
    name,
    description,
    details
  });

  try {
    await newProject.save();
    res.status(201).json({ message: 'Project added successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add project' });
  }
});

// Route to update project status (ongoing -> completed)
router.put('/update-status/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    // Toggle between 'ongoing' and 'completed'
    project.status = project.status === 'ongoing' ? 'completed' : 'ongoing';

    await project.save();
    res.json({ message: 'Project status updated successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update project status' });
  }
});

// Route to get detailed project information by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch project details' });
  }
});

module.exports = router;
