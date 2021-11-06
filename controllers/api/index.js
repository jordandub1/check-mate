<<<<<<< HEAD
const router = require("express").Router();
const userRoutes = require("./userRoutes");
const expenseRoutes = require("./expenseRoutes");
const categoryRoutes = require(".categoryRoutes");
const budgetRoutes = require("../../controllers/api/budgetRoutes");

router.use("/user", userRoutes);
router.use("/expense", expenseRoutes);
router.use("/category", categoryRoutes);
router.use("/budget", budgetRoutes);

module.exports = router;
=======
const router = require('express').Router();
const path = require('path');

const userRoutes = require('./user-routes');

// router.use('/users', userRoutes);

module.exports = router;
>>>>>>> b63a520acddf424d114a9746fd6565c1abd9079f
