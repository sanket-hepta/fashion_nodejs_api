const express = require("express");
const router = express.Router();

const cartController = require("../controllers/cartController");

router.get("/get", cartController.index);
router.post("/add", cartController.create);
router.delete("/remove/:id", cartController.remove);

module.exports = router;