const express = require('express');
const { listEvents, createEvent, editEvent, deleteEvent } = require('../controllers/eventControllers');
const authenticate = require('../middleware/authenticate');
const authorizeAdmin = require('../middleware/authorizeAdmin');


const router = express.Router();

router.get('/', listEvents)
router.post('/create', authenticate, authorizeAdmin, createEvent)
router.put('/edit/:id', authenticate, authorizeAdmin, editEvent)
router.delete('/delete/:id', authenticate, authorizeAdmin, deleteEvent);

module.exports = router;