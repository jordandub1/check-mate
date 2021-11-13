const router = require('express').Router();
const { Budget, User, Transaction } = require('../models');
const withAuth = require('../utils/auth');

/* home-routes: Includes all routes that are not api calls. */

// GET all user information and associated budget data.
// TODO: Only get info of the one user that's logged in!
router.get('/user', async (req, res) => {
  try {
    //redirect to login page if user is not logged in
    console.log(req.session.logged_in);
    if (!req.session.logged_in) {
      res.redirect('/');
    }

    // Get all budgets and JOIN with user data
    const budgetData = await Budget.findAll({
      include: [
        {
          model: User,
          attributes: ['id'],
          where: {
            id: req.session.user_id, //only get budgets that match user_id
          },
        },
      ],
    });
    // Get all Transactions and JOIN with user data
    const transactionData = await Transaction.findAll({
      include: [
        {
          model: User,
          attributes: ['id'],
          where: {
            id: req.session.user_id, //only get Transactions that match user_id
          },
        },
      ],
    });

    // Serialize data so the template can read it
    const budgets = budgetData.map((budget) => budget.get({ plain: true }));
    const transactions = transactionData.map((transaction) =>
      transaction.get({ plain: true })
    );

    console.log(transactions);

    // Pass serialized data and session flag into template
    res.render('homepage', {
      ...budgets,
      transactions,
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

// Redirect user to login page. If they're already logged in, send to user.
router.get('/', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/user');
  }
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

router.get('/budget-display', async (req, res) => {
  res.render('budget-display');
});

router.get('/transaction-display', async (req, res) => {
  res.render('transaction-display');
});

module.exports = router;
