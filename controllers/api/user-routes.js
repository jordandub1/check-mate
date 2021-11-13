const router = require('express').Router();
const { User } = require('../../models');

// Create a new user and log them in. Their id is saved in the session data as 'user_data'.
// This should be the /register route eventually, shouldn't it?
router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/', async (req, res) => {
  try {
    const userData = await User.findAll({});
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/register', async (req, res) => {
  try {
    const newUserData = await User.create(req.body);
    res.status(200).json(newUserData);
  } catch (err) {
    res.status(400).json(err);
    console.log(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    //If username is incorrect, reject with alert.
    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    //Uses instance method to check entered pw against hash. Reject if not the same.
    const validPassword = await userData.checkPassword(req.body.password);
    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    //Log in the user and save their id in the session object
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: 'You are now logged in!' });
    });

    //res.render('homepage');
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

//If the user selects logout, the session data is wiped.
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.cookie.expires = false;
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
