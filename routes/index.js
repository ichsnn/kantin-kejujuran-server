const { Router } = require("express");
const authRoutes = require("./auth.routes");
const userRoutes = require("./user.routes");

const routes = Router();

routes.use("/auth", authRoutes);
routes.use("/user", userRoutes);

module.exports = routes;
