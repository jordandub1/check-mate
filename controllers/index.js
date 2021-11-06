const router = require('express').Router();

// const apiRoutes = require('./api');
const homeRoutes = require('./home-routes.js');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);

router.get('/', async (req, res) => {
  res.render('homepage');
});

module.exports = router;
