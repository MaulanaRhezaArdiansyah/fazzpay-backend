const express = require("express");
const router = express();
// const usersController = require("../controllers/usersController");
const transferController = require("../controllers/transferController");

router.patch("/:receiver_id/:sender_id", transferController.transfer);

module.exports = router;
