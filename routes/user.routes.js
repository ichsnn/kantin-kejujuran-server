const { Router } = require("express");
const { verifyToken } = require("../middlewares/authJwt");

const userRoutes = Router();
const controller = require("../controllers/user.controller");
const {
  checkBalanceValidation,
  checkBalanceEnough,
} = require("../middlewares/verifyUser");

userRoutes.get("/auth", verifyToken, controller.userAuth);
userRoutes.get("/home", verifyToken, controller.home);

userRoutes.post(
  "/balance/deposit",
  [verifyToken, checkBalanceValidation],
  controller.depositBalance
);

userRoutes.post(
  "/balance/withdraw",
  [verifyToken, checkBalanceValidation, checkBalanceEnough],
  controller.withdrawBalance
);

module.exports = userRoutes;
