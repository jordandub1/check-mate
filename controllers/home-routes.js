const router = require('express').Router();
const { Budget, User } = require('../models');
const withAuth = require('../utils/auth');

// router.get('/user', async (req, res) => {
router.get('/user', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const budgetData = await Budget.findAll({
      include: [
        {
          model: User,
          attributes: ['id'],
        },
      ],
    });

    // Serialize data so the template can read it
    const budgets = budgetData.map((budget) => budget.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', {
      budgets,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/budget/:id', async (req, res) => {
  try {
    const budgetData = await Budget.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['id'],
        },
      ],
    });

    const budget = budgetData.get({ plain: true });

    res.render('budget', {
      ...budget,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  //   if (req.session.logged_in) {
  //     res.redirect('/profile');
  //     return;
  //   }

  res.render('login');
});

router.get('/overview', withAuth, async (req, res) => {
  res.render('homepage');
});

module.exports = router;
