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
itemRoutes.get("/onsell/latest", controller.onSellLatest);
itemRoutes.get("/onsell/oldest", controller.onsellOldest);
itemRoutes.get("/onsell/az", controller.onsellAZ);
itemRoutes.get("/onsell/za", controller.onsellZA);
itemRoutes.get("/onsell/low", controller.onSellLow);
itemRoutes.get("/onsell/high", controller.onSellHigh);

module.exports = itemRoutes;
