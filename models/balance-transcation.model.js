const { DataTypes } = require("sequelize");
const db = require("../database");

const BalanceTransaction = db.define("balance_transaction", {
  user_id: {
    type: DataTypes.STRING(5),
    allowNull: false,
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  type: {
    type: DataTypes.CHAR(1),
    allowNull: false,
  },
});

module.exports = BalanceTransaction;
