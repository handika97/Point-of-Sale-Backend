const express = require("express");
const Router = express.Router();
const shopController = require("../controllers/shop");
Router.post("/", shopController.addShop)
  // .get("/:id_Pembeli", shopController.showItem)
  .patch("/:user", shopController.finish)
  .get("/search/:item", shopController.search)
  .get("/", shopController.record)
  .get("/history", shopController.history)
  .get("/history/:id", shopController.historyBuyer);

module.exports = Router;
