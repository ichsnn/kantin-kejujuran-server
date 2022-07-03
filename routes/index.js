const { Router } = require("express");
const authRoutes = require("./auth.routes");
const itemRoutes = require("./item.routes");
const userRoutes = require("./user.routes");

const routes = Router();

routes.use("/auth", authRoutes);
routes.use("/user", userRoutes);
routes.use("/item", itemRoutes);

module.exports = routes;
