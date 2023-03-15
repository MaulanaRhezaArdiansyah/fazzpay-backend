const authModel = require("../models/authModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_PRIVATE_KEY } = process.env;

const authController = {
  login: (req, res) => {
    return authModel
      .login(req.body)
      .then((result) => {
        jwt.sign(
          {
            id: result.id,
            last_name: result.last_name,
          },
          JWT_PRIVATE_KEY,
          { expiresIn: "1 day" },
          (error, tokenResult) => {
            return res.status(200).send({
              message: `Hi, ${result.first_name} ${result.last_name}!`,
              data: {
                token: tokenResult,
                user: {
                  id: result.id,
                  email: result.email,
                  phone: result.phone,
                },
              },
            });
          }
        );
      })
      .catch((err) => {
        return res.status(500).send({ message: err });
      });
  },

  signup: (req, res) => {
    const { firstname, lastname, email, password, phone, balance } = req.body;
    if (
      firstname == undefined ||
      lastname == undefined ||
      email == undefined ||
      password == undefined
    ) {
      return res
        .status(500)
        .send({ message: `Something wrong in signup form!` });
    }
    if (firstname.length == 0) {
      return res.status(400).send({ message: `Firstname can't be empty!` });
    } else if (lastname.length == 0) {
      return res.status(400).send({ message: `Lastname can't be empty!` });
    } else if (email.length == 0) {
      return res.status(400).send({ message: `Email can't be empty!` });
    } else if (password.length == 0) {
      return res.status(400).send({ message: `Password can't be empty!` });
    } else {
      bcrypt.hash(password, 10, (errorHash, resultHash) => {
        if (errorHash) {
          return res.status(500).send({ message: errorHash.message });
        } else {
          const request = {
            firstname,
            lastname,
            email,
            password: resultHash,
            phone,
            file: req.file,
            balance,
          };
          return authModel
            .signup(request)
            .then((result) => {
              return res.status(201).send({
                message: `Signup ${result.firstname} ${result.lastname} is success!`,
                data: result,
              });
            })
            .catch((error) => {
              return res.status(500).send({ message: error });
            });
        }
      });
    }
  },
};

module.exports = authController;
