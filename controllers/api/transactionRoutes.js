const router = require('express').Router();
const { Transaction, User } = require('../../models');

//All routes here start with `http://localhost:####/api/transaction` .

//GET all transactions--just for testing purposes
//REMOVE THIS before deployment!
router.get('/', async (req, res) => {
  try {
    const allTransactions = await Transaction.findAll({
      include: [{ model: User }],
    });
    res.status(200).json(allTransactions);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET all transactions for a specific user.
router.get('/:id', async (req, res) => {
  try {
    const allTransactions = await Transaction.findAll({
      include: [{ model: User }],
      where: { user_id: req.params.id },
    });
    res.status(200).json(allTransactions);
  } catch (err) {
    res.status(500).json(err);
  }
});

//POST (create) a new transaction.
router.post('/', async (req, res) => {
  try {
    const newTransactionData = await Transaction.create(req.body);
    res.status(200).json(newTransactionData);
  } catch (err) {
    res.status(400).json(err);
  }
});

//UPDATE Transaction--probably only need delete, but it's here if we want it.
router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const newTransactionData = await Transaction.update(req.body, {
      where: { id: req.params.id },
    });
    res.status(200).json(newTransactionData);
  } catch (err) {
    res.status(400).json(err);
  }
});

//DELETE a transaction by id--in case you mess up a transaction. Good UX practice to have an 'undo' option.
router.delete('/:id', async (req, res) => {
  try {
    const selectedTransaction = await Transaction.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No Transaction found with this id!' });
      return;
    }
    res.status(200).json(selectedTransaction);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a transaction by id--doesn't seem super useful.
// Will need a different url than the one above if we decide this is necessary.

// router.get('/:id', async (req, res) => {
//     try {
//       const selectedTransaction = await Transaction.findByPk(req.params.id, {

//       })

//       if (!selectedTransaction) {
//         res.status(404).json({ message: 'No transaction found with this id!' });
//         return;
//       }

//       res.status(200).json(selectedTransaction);
//     } catch (err) {
//       res.status(500).json(err)
//     }
//   });

module.exports = router;
