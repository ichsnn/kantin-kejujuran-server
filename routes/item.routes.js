const { Router } = require("express");
const { verifyToken } = require("../middlewares/authJwt");

const controller = require("../controllers/item.controller");
const { uploadImage } = require("../middlewares/verifyFile");

const itemRoutes = Router();

itemRoutes.post("/sell", [verifyToken, uploadImage.single('image')], controller.sellItem);

module.exports = itemRoutes;
