const { Item, User } = require("../models");

const verifyItemNotSold = async (req, res, next) => {
  try {
    const { id } = req.body;
    const item = await Item.findOne({
      where: {
        id,
        sold: false,
      },
    });
    if (!item) {
      return res.status(400).json({ error: true, message: "Item not found" });
    }
    next();
  } catch (error) {
    return res.status(400).json({ error: true, message: "Item not found" });
  }
};

const verifyItem = async (req, res, next) => {
  try {
    const { id } = req.body;
    const item = await Item.findOne({
      where: {
        id,
      },
    });
    if (!item) {
      return res.status(400).json({ error: true, message: "Item not found" });
    }
    next();
  } catch (error) {
    return res.status(400).json({ error: true, message: "Item not found" });
  }
};

const verifyBuyer = async (req, res, next) => {
  try {
    const user_id = req.userId;
    const item = await Item.findOne({
      where: {
        id: req.body.id,
      },
    });
    if(user_id === item.user_id) {
      return res.status(400).json({ error: true, message: "You can't buy your own item" });
    }
    next();
  } catch (error) {
    return res.status(400).json({ error: true, message: "Item not found" });
  }
};

const verifyBalanceEnough = async (req, res, next) => {
  try {
    const user_id = req.userId;
    const item = await Item.findOne({
      where: {
        id: req.body.id,
      },
    });
    const user = await User.findOne({
      where: {
        id: user_id,
      },
    });
    if(user.balance < item.price) {
      return res.status(400).json({ error: true, message: "You don't have enough balance" });
    }
    next();
  } catch (error) {
    return res.status(400).json({ error: true, message: "Item not found" });
  }
}

module.exports = {
  verifyItem,
  verifyItemNotSold,
  verifyBuyer,
  verifyBalanceEnough
};
