const { DataTypes } = require("sequelize");
const db = require("../database");

// create item transaction model
const ItemTransaction = db.define("item_transactions", {
  user_id: {
    type: DataTypes.STRING(5),
    allowNull: false,
  },
  item_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = ItemTransaction;
