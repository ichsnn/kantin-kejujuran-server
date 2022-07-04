const { User } = require("../models");

const userAuth = async (req, res) => {
  const id = req.userId;
  const user = await User.findOne({
    where: {
      id: id,
    },
  });

  if (!user) {
    return res.status(400).json({ error: true, message: "User not found" });
  }

  return res.json({
    id: user.id,
    name: user.name,
  });
};

const home = async (req, res) => {
  const id = req.userId;
  const user = await User.findOne({
    where: {
      id: id,
    },
  });

  if (!user) {
    return res.status(400).json({ error: true, message: "User not found" });
  }

  return res.json({
    id: user.id,
    name: user.name,
    balance: user.balance,
  });
};

const addBalance = async (req, res) => {
  const id = req.userId;
}

module.exports = {
  userAuth,
  home
};
