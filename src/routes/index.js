const express = require("express");
const router = express();
const usersRoute = require("./usersRoute");
const authRoute = require("./authRoute");
const transferRoute = require("./transferRoute");
const historyRoute = require("./historyRoute");

router.get("/", (req, res) => {
  res.send("FazzPay Backend");
});

router.use("/users", usersRoute);
router.use("/auth", authRoute);
router.use("/transfer", transferRoute);
router.use("/history", historyRoute);

module.exports = router;
