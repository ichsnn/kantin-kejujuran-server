const { User } = require("../models");

const checkDuplicateId = async (req, res, next) => {
  const { id } = req.body;
  const user = await User.findOne({ where: { id } });
  if (user) {
    return res.status(400).json({
      message: "ID already exists",
    });
  }
  next();
};

const checkIDValidation = (req, res, next) => {
  const { id } = req.body;

  if(!id) {
    return res.status(400).json({
      message: "ID is required"
    });
  }

  if (!/^[0-9]+$/.test(id)) {
    return res.status(400).json({
      message: "ID must be numbers",
    });
  }

  if (id.length !== 5) {
    return res.status(400).json({
      message: "ID must be 5 characters long",
    });
  }

  // slice 3 first characters of id
  const firstThreeCharacters = id.slice(0, 3).split("").map(Number);
  const lastTwoCharacters = parseInt(id.slice(3, 5));

  // sum first three characters with fasted way
  const sumFristThree = firstThreeCharacters.reduce((acc, curr) => acc + curr);

  // check if last two numbers equal to sum of first three numbers
  if (sumFristThree !== lastTwoCharacters) {
    return res.status(400).json({
      message: "ID is not valid",
    });
  }

  if (!id) {
    return res.status(400).json({
      message: "ID is required",
    });
  }
  next();
};

const checkBalanceValidation = (req, res, next) => {
  const { amount } = req.body;
  if (!amount) {
    return res.status(400).json({
      message: "Amount is required",
    });
  }
  if (!/^[0-9]+$/.test(amount)) {
    return res.status(400).json({
      message: "Amount must be numbers",
    });
  }
  if (amount < 0) {
    return res.status(400).json({
      message: "Amount must be positive",
    });
  }
  next();
}

const checkBalanceEnough = async (req, res, next) => {
  const { amount } = req.body;
  const id = req.userId;
  const user = await User.findOne({
    where: {
      id,
    },
  });
  if (user.balance < amount) {
    return res.status(400).json({
      message: "Balance is not enough",
    });
  }
  next();
}

const VerifyUser = {
  checkDuplicateId,
  checkIDValidation,
  checkBalanceValidation,
  checkBalanceEnough,
  checkBalanceEnough
};

module.exports = VerifyUser;
