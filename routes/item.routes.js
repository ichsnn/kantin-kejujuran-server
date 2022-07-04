const { Router } = require("express");
const { verifyToken } = require("../middlewares/authJwt");

const controller = require("../controllers/item.controller");
const { uploadImage } = require("../middlewares/verifyFile");
const {
  verifyItemNotSold,
  verifyItem,
  verifyBuyer,
  verifyBalanceEnough,
} = require("../middlewares/verifyItem");

const itemRoutes = Router();

itemRoutes.post(
  "/sell",
  [verifyToken, uploadImage.single("image")],
  controller.sellItem
);
itemRoutes.post(
  "/buy",
  [
    verifyToken,
    verifyItem,
    verifyItemNotSold,
    verifyBuyer,
    verifyBalanceEnough,
  ],
  controller.buyItem
);
itemRoutes.get("/onsell", controller.onsell);
itemRoutes.get("/onsell/:page", controller.onsellPage);

module.exports = itemRoutes;
