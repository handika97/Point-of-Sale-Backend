const express = require("express");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./upload");
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });
const Router = express.Router();
const productController = require("../controllers/product");
//, upload.single("Image")
Router.get("/:page", productController.getProduct)
  .get("/", productController.Product)
  .get("/:sortby/:mode", productController.sortBy)
  .get("/:id_product", productController.productDetail)
  .post("/", upload.single("Image"), productController.insertProduct)
  .patch(
    "/:id_product",
    upload.single("Image"),
    productController.updateProduct
  )
  .delete("/:id_product", productController.deleteProduct);

module.exports = Router;
