
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Transaction extends Model {}

Transaction.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id {
        type: DataTypes.INTEGER,
        references: {
            model: 'user',
            key: 'id',
        },
    },
    tran_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    category: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
          model: 'category',
          key: 'id',
      },
    },
    is_expense: {
      type: DataTypes.BOOLEAN,
    },
    is_recurring: {
      type: DataTypes.BOOLEAN,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    notes: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'transaction',
  }
);

module.exports = Transaction;
