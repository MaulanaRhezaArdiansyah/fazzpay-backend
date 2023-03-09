const historyModel = require("../models/historyModel");

const historyController = {
  getHistory: (req, res) => {
    const id = req.params.id;
    // const request = {
    //   receiver_id: req.params.receiver_id,
    //   sender_id: req.params.sender_id,
    // };
    return (
      historyModel
        // .getHistory(request)
        .getHistory(id)
        .then((result) => {
          // console.log(result);
          return res.status(200).send({
            data: result,
            message: `Success get history ${result.first_name} ${result.last_name}!`,
          });
        })
        .catch((error) => {
          return res.status(500).send({ message: error });
        })
    );
  },
};

module.exports = historyController;
