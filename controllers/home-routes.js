const router = require('express').Router();
const { Budget, User } = require('../models');
const withAuth = require('../utils/auth');

/* home-routes: Includes all routes that are not api calls. */

// GET sll user information and associated budget data.
// TODO: Only get info of the one user that's logged in!
router.get('/user', async (req, res) => {
  try {
    // Get all budgets and JOIN with user data
    const budgetData = await Budget.findAll({
      include: [
        {
          model: User,
          attributes: ['id'],
          where: {
            id: req.session.user_id //only get budgets that match user_id
          }
        },
      ],
    });

    // Serialize data so the template can read it
    const budgets = budgetData.map((budget) => budget.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', {
      ...budgets,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET a budget by id.
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

// Redirect user to login page
router.get('/', (req, res) => {
  res.render('login');
});

// Redirect user to signup page
router.get('/signup', async (req, res) => {
  res.render('signup');
});

// Redirect user to main overview page with all their data
router.get('/overview', withAuth, async (req, res) => {
  res.render('homepage');
});

module.exports = router;
