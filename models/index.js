//TODO: customize project section
const User = require('./User');
const Transaction = require('./Transaction');
const Category = require('./Category');

User.hasMany(Transaction, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Transaction.belongsTo(User, {
  foreignKey: 'user_id',
});

module.exports = { User, Transaction };