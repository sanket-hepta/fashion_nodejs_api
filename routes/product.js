const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController");
const { verifyToken, isAdmin } = require("../middleweares/verifyToken");

router.get("/index", productController.index);
router.get("/get/:slug", productController.getProduct);
router.post("/create", verifyToken, isAdmin, productController.create);
router.put("/update", verifyToken, isAdmin, productController.update);
router.delete("/remove/:id", verifyToken, isAdmin, productController.remove);

module.exports = router;