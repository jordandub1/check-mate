const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./home-routes.js');

// All api routes begin with /api; home routes don't begin with anything
router.use('/', homeRoutes);
router.use('/api', apiRoutes);

module.exports = router;
