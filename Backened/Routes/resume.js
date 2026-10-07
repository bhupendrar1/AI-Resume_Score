const express = require('express');
const router = express.Router();
const ResumeController = require('../Controllers/resume');
const { upload } = require('../utils/multer');
const { requireAuth } = require('../middleware/auth');
const { requireAdmin } = require('../middleware/adminOnly');

// Upload and analyze resume
router.post('/addResume', upload.single('resume'), requireAuth, ResumeController.addResume);

// Get user resume history
router.get('/get/:user', requireAuth, ResumeController.getAllResumesForUser);

// Admin: Get all resume records & stats
router.get('/get', requireAuth, requireAdmin, ResumeController.getResumeForAdmin);

// Delete resume
router.delete('/:id', requireAuth, ResumeController.deleteResume);

module.exports = router;
