const { Router } = require("express");
const { VerifyUser } = require("../middlewares");
const controller = require("../controllers/auth.controller");

const authRoutes = Router();

authRoutes.use((req, res, next) => {
  res.header(
    "Acccess-Controll-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

authRoutes.post(
  "/signup",
  [VerifyUser.checkIDValidation, VerifyUser.checkDuplicateId],
  controller.signup
);

authRoutes.post("/signin", VerifyUser.checkIDValidation, controller.signin);

module.exports = authRoutes;