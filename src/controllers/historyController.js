const historyModel = require("../models/historyModel");

const historyController = {
  getHistory: (req, res) => {
    const id = req.params.id;
    return historyModel
      .getHistory(id)
      .then((result) => {
        return res.status(200).send({
          data: result,
          message: `Success get history ${result.first_name} ${result.last_name}!`,
        });
      })
      .catch((error) => {
        return res.status(500).send({ message: error });
      });
  },
};

module.exports = historyController;
