const express = require("express");
const router = express();
const authController = require("../controllers/authController");
const formUpload = require("../helpers/formUpload");

router.post("/login", authController.login);
router.post("/signup", formUpload.single("ava"), authController.signup);

module.exports = router;
