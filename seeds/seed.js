const sequelize = require('../config/connection');
const { User, Budget, Transaction, Category } = require('../models');

const userData = require('./userData.json');
//const projectData = require('./projectData.json');
const transactData = require('./transactionData_jdp.json');
const budgetData = require('./budgetData_jdp.json')


const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  //JDP 11/7 @ 11:21 Note: Added these to seed database from seedfiles, seedfiles currently empty.
  const budget = await Budget.bulkCreate(budgetData, {
    individualHooks: true,
    returning: true,
  });
  const transactions = await Transaction.bulkCreate(transactData, {
    individualHooks: true,
    returning: true, 
  })
  }

  process.exit(0);


seedDatabase();
