const express = require("express");
const router = express.Router();

const controller = require("../controllers/productController");

router.post("/api/products", controller.createProduct);
router.put("/api/products/:id", controller.updateProduct);
router.delete("/api/products/:id", controller.deleteProduct);

module.exports = router;