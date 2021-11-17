// budget model
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Budget extends Model {}

Budget.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    total_income: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    total_remain: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    total_expense: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    savings_goal_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    savings_amount: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    savings_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    goal_remain: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'budget',
  }
);

module.exports = Budget;
