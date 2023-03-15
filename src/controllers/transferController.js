const transferModel = require("../models/transferModel");
const usersModel = require("../models/usersModel");

const transferController = {
  transfer: async (req, res) => {
    const request = {
      amount: parseInt(req.body.amount),
      receiver_id: req.params.receiver_id,
      sender_id: req.params.sender_id,
    };
    try {
      const detailSender = await usersModel.getDetail(request.sender_id);
      const detailReceiver = await usersModel.getDetail(request.receiver_id);
      if (parseInt(detailSender.balance) < request.amount) {
        return res.status(400).send({
          message: `Your balance is not enough to transfer to ${detailReceiver.first_name}! Pleasy try again!`,
        });
      }
    } catch (error) {
      return res.status(500).send({ message: error });
    }
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
