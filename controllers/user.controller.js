const { User, BalanceTransaction } = require("../models");

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

const depositBalance = async (req, res) => {
  const id = req.userId;
  const amount = req.body.amount;
  const type = "D";
  await BalanceTransaction.create({
    user_id: id,
    amount: amount,
    type: type,
  });
  // add current balance after deposit to user
  const user = await User.findOne({
    where: {
      id: id,
    },
  });
  const newBalance = parseInt(user.balance) + parseInt(amount);
  await User.update(
    {
      balance: newBalance,
    },
    {
      where: {
        id: id,
      },
    }
  );
  // send message success
  return res.json({
    message: "Deposit success",
  });
};

const withdrawBalance = async (req, res) => {
  const id = req.userId;
  const amount = req.body.amount;
  const type = "W";
  await BalanceTransaction.create({
    user_id: id,
    amount: amount,
    type: type,
  });
  // subtract current balance after withdraw from user
  const user = await User.findOne({
    where: {
      id: id,
    },
  });
  const newBalance = user.balance - amount;
  await User.update(
    {
      balance: newBalance,
    },
    {
      where: {
        id: id,
      },
    }
  );
  return res.json({
    message: "Withdraw success",
  });
};

module.exports = {
  userAuth,
  home,
  depositBalance,
  withdrawBalance,
};
