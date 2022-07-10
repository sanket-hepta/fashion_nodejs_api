const express = require("express");
const router = express.Router();

const categoriesController = require("../controllers/categoriesController");
const { verifyToken, isAdmin } = require("../middleweares/verifyToken");

router.get("/index", verifyToken, categoriesController.index);
router.post("/create", verifyToken, isAdmin, categoriesController.create);
router.put("/update", verifyToken, isAdmin, categoriesController.update);
router.post("/remove", verifyToken, isAdmin, categoriesController.remove);

module.exports = router;