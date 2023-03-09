const transferModel = require("../models/transferModel");
const usersModel = require("../models/usersModel");

const transferController = {
  transfer: async (req, res) => {
    const request = {
      amount: parseInt(req.body.amount),
      id: req.params.id,
      id2: req.params.id2,
    };
    try {
      const detailSender = await usersModel.getDetail(request.id2);
      const detailReceiver = await usersModel.getDetail(request.id);
      if (detailSender[0].balance < request.amount) {
        return res.status(400).send({
          message: `Your balance is not enough to transfer to ${detailReceiver[0].first_name}! Pleasy try again!`,
        });
      }
    } catch (error) {
      //   console.log(error);
      return res.status(500).send({ message: error });
    }
    // console.log(request.amount);
    return transferModel
      .transfer(request)
      .then((result) => {
        if (result == undefined) {
          return res.status(404).send({ message: "User not found!" });
        } else {
          return res.status(200).send({
            data: result,
            message: `Successfully transfer to ${result.receiver_name} from ${result.sender_name}!`,
          });
        }
      })
      .catch((err) => {
        return res.status(500).send({ message: err });
      });
  },
};
module.exports = transferController;
