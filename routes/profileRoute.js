const express = require('express');
const { editProfile, getDataProfile } = require('../controllers/profileController');
const authenticate = require('../middleware/authenticate');



const router = express.Router();

router.put('/edit', authenticate, editProfile);
router.get('/', authenticate, getDataProfile);


module.exports = router;