const User = require('./user.model');
const Item = require('./item.model');


// one user can sell many items
Item.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(Item, { foreignKey: 'user_id' });

// one item can be sold by one users
Item.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(Item, { foreignKey: 'user_id' });

const models = {User, Item};

module.exports = models;