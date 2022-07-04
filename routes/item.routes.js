const { Router } = require("express");
const { verifyToken } = require("../middlewares/authJwt");

const controller = require("../controllers/item.controller");
const { uploadImage } = require("../middlewares/verifyFile");

const itemRoutes = Router();

itemRoutes.post("/sell", [verifyToken, uploadImage.single('image')], controller.sellItem);
itemRoutes.get("/onsell", controller.onsell)
itemRoutes.get("/onsell/:page", controller.onsellPage)

module.exports = itemRoutes;
