const express = require("express");
const router = express.Router();

const orderContoller = require("../controllers/orderController");

router.post("/create", orderContoller.create);

module.exports = router;