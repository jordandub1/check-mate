const router = require("express").Router();
const userRoutes = require("./userRoutes");
const expenseRoutes = require("./expenseRoutes");
const categoryRoutes = require(".categoryRoutes");
const budgetRoutes = require("./budgetRoutes");

router.use("/user", userRoutes);
router.use("/expense", expenseRoutes);
router.use("/category", categoryRoutes);
router.use("/budget", budgetRoutes);

module.exports = router;