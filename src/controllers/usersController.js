const usersModel = require("../models/usersModel");
const formResponse = require("../helpers/formResponse");
const { unlink } = require("node:fs");

const usersController = {
  get: (req, res) => {
    return usersModel
      .get(req.query)
      .then((result) => {
        if (result.length == 0) {
          return formResponse(404, {}, `Data users is empty!`, res);
        }
        return formResponse(200, result, `Success get all data users!`, res);
      })
      .catch((error) => {
        return formResponse(500, {}, error, res);
      });
  },

  getDetail: (req, res) => {
    const id = req.params.id;
    return usersModel
      .getDetail(id)
      .then((result) => {
        if (result == undefined) {
          return formResponse(404, {}, `User not found`, res);
        }
        return formResponse(
          200,
          result,
          `Success get data ${result.first_name} ${result.last_name}!`,
          res
        );
      })
      .catch((error) => {
        return formResponse(500, {}, error, res);
      });
  },

  remove: (req, res) => {
    const id = req.params.id;
    return usersModel
      .remove(id)
      .then((result) => {
        if (result.rowCount == 0) {
          return formResponse(404, {}, `User not found`, res);
        }
        return formResponse(
          200,
          result.rows[0],
          `Deleting user ${result.rows[0].first_name} ${result.rows[0].last_name} success!`,
          res
        );
      })
      .catch((error) => {
        return formResponse(500, {}, error, res);
      });
  },

  updateBalanceTopUp: (req, res) => {
    const request = {
      balance: parseInt(req.body.balance),
      id: req.params.id,
    };
    return usersModel
      .updateBalanceTopUp(request)
      .then((result) => {
        if (result == undefined) {
          return formResponse(404, {}, "User not found", res);
        } else {
          return formResponse(
            200,
            result,
            `Top Up ${result.name} success!`,
            res
          );
        }
      })
      .catch((err) => {
        return formResponse(500, {}, err, res);
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
          return formResponse(404, {}, "User not found!", res);
        } else {
          return formResponse(
            200,
            result,
            `Edit phone number ${result.name} success!`,
            res
          );
        }
      })
      .catch((err) => {
        return formResponse(500, {}, err, res);
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
          return formResponse(404, {}, "User not found!", res);
        } else {
          unlink(`public/uploads/images/${result.oldAvatar}`, () => {
            console.log(`Successfully deleted ${result.oldAvatar}`);
          });
          return formResponse(
            200,
            result,
            `Edit avatar ${result.name} success!`,
            res
          );
        }
      })
      .catch((err) => {
        return formResponse(500, {}, err, res);
      });
  },
};

module.exports = usersController;
