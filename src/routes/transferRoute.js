const express = require("express");
const router = express();
// const usersController = require("../controllers/usersController");
const transferController = require("../controllers/transferController");

router.patch("/:id/:id2", transferController.transfer);

module.exports = router;
