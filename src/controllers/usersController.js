const usersModel = require("../models/usersModel");

const usersController = {
  get: (req, res) => {
    return usersModel
      .get(req.query)
      .then((result) => {
        if (result.length == 0) {
          return res
            .status(404)
            .send({ data: result, message: `Data users is empty!` });
        }
        return res
          .status(200)
          .send({ data: result, message: `Success get data users!` });
      })
      .catch((error) => {
        return res.status(500).send({ message: error });
      });
  },
  getDetail: (req, res) => {
    const id = req.params.id;
    return usersModel
      .getDetail(id)
      .then((result) => {
        if (result == undefined) {
          return res
            .status(404)
            .send({ data: result, message: `User not found` });
        }
        return res.status(200).send({
          data: result,
          message: `Success get data ${result[0].first_name} ${result[0].last_name}!`,
        });
      })
      .catch((error) => {
        return res.status(500).send({ message: error });
      });
  },
  remove: (req, res) => {
    const id = req.params.id;
    return usersModel
      .remove(id)
      .then((result) => {
        if (result.rowCount == 0) {
          return res.status(404).send({ message: `User not found!` });
        }
        return res.status(200).send({
          data: result.rows,
          message: `Deleting user ${result.rows[0].first_name} ${result.rows[0].last_name} success!`,
        });
      })
      .catch((error) => {
        return res.status(500).send(error);
      });
  },
  updateBalanceTopUp: (req, res) => {
    // const balanceInt = parseInt(req.body.balance);
    const request = {
      // ...req.body,
      // balance: balanceInt,
      balance: parseInt(req.body.balance),
      id: req.params.id,
    };
    // console.log(request.balance);
    return usersModel
      .updateBalanceTopUp(request)
      .then((result) => {
        if (result == undefined) {
          return res.status(404).send({ message: "User not found" });
        } else {
          return res.status(200).send({
            data: result,
            message: `Top Up success!`,
          });
        }
      })
      .catch((err) => {
        return res.status(500).send({ message: err });
      });
  },
  updatePhone: (req, res) => {
    const request = {
      ...req.body,
      id: req.params.id,
    };
    return usersModel
      .updatePhone(request)
      .then((result) => {
        if (result == undefined) {
          return res.status(404).send({ message: "User not found" });
        } else {
          return res.status(200).send({
            data: result,
            message: `Edit phone number ${result.id} success!`,
          });
        }
      })
      .catch((err) => {
        return res.status(500).send({ message: err });
      });
  },
  updateAvatar: (req, res) => {
    const request = {
      ...req.body,
      file: req.file,
      id: req.params.id,
    };
    return usersModel
      .updateAvatar(request)
      .then((result) => {
        if (result == undefined) {
          return res.status(404).send({ message: "User not found" });
        } else {
          return res.status(200).send({
            data: result,
            message: `Edit avatar ${result.id} success!`,
          });
        }
      })
      .catch((err) => {
        return res.status(500).send({ message: err });
      });
  },
};

module.exports = usersController;
