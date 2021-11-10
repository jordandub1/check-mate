//TODO: customize project section
const User = require('./User');
const Transaction = require('./Transaction');
const Budget = require('./Budget');

User.hasMany(Transaction, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

User.hasOne(Budget, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Transaction.belongsTo(User, {
  foreignKey: 'user_id',
});

Budget.belongsTo(User, {
  foreignKey: 'user_id'
})

module.exports = { User, Transaction, Budget};