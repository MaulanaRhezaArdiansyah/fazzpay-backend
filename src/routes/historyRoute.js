const express = require("express");
const router = express();
const historyController = require("../controllers/historyController");

router.get("/:id", historyController.getHistory);
// router.get("/:receiver_id/:sender_id", historyController.getHistory);

module.exports = router;
