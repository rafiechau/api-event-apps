const express = require('express');
const { editProfile } = require('../controllers/profileController');
const authenticate = require('../middleware/authenticate');



const router = express.Router();

router.put('/', authenticate, editProfile);


module.exports = router;