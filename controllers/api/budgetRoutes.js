const router = require('express').Router();
const { Budget, User } = require('../../models');

// GET all Budget Data
router.get('/', async (req, res) => {
  try {
    const budgetData = await Budget.findAll();
    res.status(200).json(budgetData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ONE Budget
router.get('/:id', async (req, res) => {
  try {
    const budgetData = await Budget.findByPk(req.params.id, {
      where: {
        id: req.params.id,
      },
      include: {
        model: User,
        attributes: ['name'],
      },
    });

    if (!budgetData) {
      res.status(404).json({ message: 'No budget exists with this id!' });
      return;
    }

    res.status(200).json(budgetData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE a new budget
router.post('/', async (req, res) => {
  try {
    const budgetData = await Budget.create(req.body);
    res.status(200).json(budgetData);
  } catch (err) {
    res.status(404).json(err);
  }
});

// UPDATE a budget
router.put('/:id', async (req, res) => {
  try {
    const budgetData = await Budget.update(
      {
        //   user_id: req.body.user_id,
        total_income: req.body.total_income,
        total_remain: req.body.total_remain,
        //   savings_goal_name: req.body.savings_goal_name,
        //   savings_amount: req.body.savings_amount,
        //   savings_date: req.body.savings_date
      },
      {
        where: {
          user_id: req.session.user_id,
        },
      }
    );

    if (!budgetData) {
      res.status(404).json({ message: 'No budget found with this id!' });
      return;
    }

    res.status(200).json(budgetData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//   DELETE a budget
router.delete('/:id', async (req, res) => {
  try {
    const budgetData = await Budget.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!budgetData) {
      res.status(404).json({ message: 'No budget found with this id' });
      return;
    }

    res.status(200).json(budgetData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
