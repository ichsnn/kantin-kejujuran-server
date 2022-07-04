const User = require("./user.model");
const Item = require("./item.model");
const ItemTranscation = require("./item-transaction.model.js");
const BalanceTransaction = require("./balance-transcation.model");

// one to many
User.hasMany(Item, {
  foreignKey: "user_id",
  as: "items",
});
Item.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
});

// create item transaction model
ItemTranscation.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
}
);
ItemTranscation.belongsTo(Item, {
  foreignKey: "item_id",
  as: "item",
});

// create balance transaction model
BalanceTransaction.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
});

const models = { User, Item, ItemTranscation, BalanceTransaction };

module.exports = models;
