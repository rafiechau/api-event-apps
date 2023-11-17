const express = require('express');
const authRoute = require('./authRoute');
const adminRoute = require('./adminRoute');
const eventRoute = require('./eventRoute');
const profileRoute = require('./profileRoute');

const router = express.Router();

router.use('/user', authRoute);
router.use('/admin', adminRoute);

router.use('/events', eventRoute);
router.use('/profile', profileRoute )

module.exports = router;