const express = require('express');
const { registerUser, loginUser, deleteUser, changePasswordUser, forgotPassword } = require('../controllers/authControllers');
const authenticate = require('../middleware/authenticate');

const router = express.Router();

router.post('/register', registerUser)
router.post('/login', loginUser)
router.delete('/delete', authenticate, deleteUser)
router.put('/change-password', authenticate, changePasswordUser);
router.post('/forgot-password', forgotPassword);

module.exports = router;