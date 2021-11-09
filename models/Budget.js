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
      allowNull: false,
    },
    total_remain: {
      type: DataTypes.DECIMAL,
      allowNull: false,
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
    transaction_list: {
        type: DataTypes.ARRAY,
        allowNull: true,
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'budget',
  }
);
