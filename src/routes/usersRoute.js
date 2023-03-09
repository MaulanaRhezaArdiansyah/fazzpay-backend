const express = require("express");
const router = express();
const usersController = require("../controllers/usersController");
const formUpload = require("../helpers/formUpload");

router.get("/", usersController.get);
router.get("/:id", usersController.getDetail);
router.delete("/:id", usersController.remove);
router.patch("/:id", usersController.updateBalanceTopUp);
router.patch("/edit-phone/:id", usersController.updatePhone);
router.patch(
  "/avatar/:id",
  formUpload.single("avatar"),
  usersController.updateAvatar
);

module.exports = router;
