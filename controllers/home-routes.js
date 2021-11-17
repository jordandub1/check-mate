const router = require('express').Router();
const { Budget, User, Transaction } = require('../models');
const withAuth = require('../utils/auth');

/* home-routes: Includes all routes that are not api calls. */

// GET all user information and associated budget data.
// Only get info of the one user that's logged in!
router.get('/user', async (req, res) => {
  try {
    //redirect to login page if user is not logged in
    console.log(req.session.logged_in);
    if (!req.session.logged_in) {
      res.redirect('/');
      return;
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
    console.log(budgetData);
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

    //Get user data
    const userData = await User.findByPk(req.session.user_id);
    console.log('THE USER DATA: ' + userData);
    console.log(typeof userData);

    // Serialize data so the template can read it
    const budgets = budgetData.map((budget) => budget.get({ plain: true }));

    const transactions = transactionData.map((transaction) =>
      transaction.get({ plain: true })
    );

    //const user = userData.map((user) => user.get({ plain: true }));
    const user = userData.get({ plain: true });

    // Pass serialized data and session flag into template
    res.render('homepage', {
      budgets,
      transactions,
      user,
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
    return;
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

//Redirect to Budget Display Page
router.get('/budget-display', async (req, res) => {
  try {
    //redirect to login page if user is not logged in
    console.log(req.session.logged_in);
    if (!req.session.logged_in) {
      res.redirect('/');
      return;
    }

    // Get all Transactions and JOIN with user data
    const budgetData = await Budget.findAll({
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

    const transactions = transactionData.map((transaction) =>
      transaction.get({ plain: true })
    );

    const userData = await User.findByPk(req.session.user_id);
    const user = userData.get({ plain: true });

    // Serialize data so the template can read it
    const budgets = budgetData.map((budget) => budget.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('budget-display', {
      budgets,
      transactions,
      user,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/transaction-display', async (req, res) => {
  try {
    //redirect to login page if user is not logged in
    console.log(req.session.logged_in);
    if (!req.session.logged_in) {
      res.redirect('/');
      return;
    }

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

    const userData = await User.findByPk(req.session.user_id);
    const user = userData.get({ plain: true });

    // Serialize data so the template can read it
    const transactions = transactionData.map((transaction) =>
      transaction.get({ plain: true })
    );

    // Pass serialized data and session flag into template
    res.render('transaction-display', {
      transactions,
      user,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
