const express = require('express');
const viewsController = require('../controllers/viewsController');

const router = express.Router();

router.get('/', viewsController.getOverview);

router.get('/tours/:slug', viewsController.getTour);

// /Login Route
router.get('/login', viewsController.getLoginForm);
module.exports = router;
