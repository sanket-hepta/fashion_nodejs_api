const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");

router.post("/sign-up", authController.register);
router.post("/sign-in", authController.login);
router.get("/get-user/:id", authController.getUser);
router.put("/update-user", authController.updateUser);

module.exports = router;