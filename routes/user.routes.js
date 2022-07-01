const { Router } = require("express");
const { verifyToken } = require("../middlewares/authJwt");

const userRoutes = Router();
const controller = require("../controllers/user.controller");

userRoutes.get("/auth", verifyToken, controller.userAuth);
userRoutes.get("/home", verifyToken, controller.home);

module.exports = userRoutes;
