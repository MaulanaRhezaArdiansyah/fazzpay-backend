require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
const cors = require("cors");
const router = require("./src/routes/index");
const { urlencoded, json } = require("body-parser");
app.use(express.static("public"));
app.use(urlencoded({ extended: true }));
app.use(json());
app.use(cors());

app.use("/api/v1", router);

app.use("*", (req, res) => {
  return res.status(400).send({ message: `Page not found!` });
});

app.listen(port, () => {
  console.log(`FazzPay App Backend is running on port ${port}. Yuhuuu!!`);
});
