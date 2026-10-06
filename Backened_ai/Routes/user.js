const express = require('express');
const router = express.Router();
const UserController = require('../Controllers/user');
const { requireAuth } = require('../middleware/auth');
const { requireAdmin } = require('../middleware/adminOnly');

router.post('/register', UserController.register);
router.post('/', UserController.register);
router.get('/', requireAuth, requireAdmin, UserController.getUsers);

module.exports = router;
