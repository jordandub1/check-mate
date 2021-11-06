const router = require('express').Router();
const path = require('path');

const userRoutes = require('./user-routes');

router.use('/users', userRoutes);

router.get('/', async (req, res) => {
  res.render('homepage');
});

module.exports = router;
