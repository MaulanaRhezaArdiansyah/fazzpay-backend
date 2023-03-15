const db = require("../helpers/db");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

const authModel = {
  login: ({ email, password }) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM users WHERE email = $1`,
        [email],
        (error, result) => {
          if (error) {
            return reject(error.message);
          }
          if (result.rows.length == 0) {
            return reject("Invalid email or password! Please try again!");
          }
          bcrypt.compare(
            password,
            result.rows[0].password,
            (errorCompare, hashingResult) => {
              console.log(hashingResult);
              if (errorCompare) {
                return reject("Invalid email or password! Please try again!");
              }
              // if password not matching
              if (!hashingResult) {
                return reject("Invalid email or password! Please try again!");
              }
              return resolve(result.rows[0]);
            }
          );
        }
      );
    });
  },

  signup: ({
    id,
    firstname,
    lastname,
    email,
    password,
    phone = "",
    file = "",
    balance = 0,
  }) => {
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO users (id, first_name, last_name, email, password, phone, avatar, balance) VALUES ($1,$2, $3, $4, $5, $6, $7, $8)`,
        [
          uuidv4(),
          firstname,
          lastname,
          email,
          password,
          phone,
          file.filename,
          balance,
        ],
        (error) => {
          if (error) {
            return reject(error.message);
          } else {
            return resolve({
              id,
              firstname,
              lastname,
              email,
              password,
              phone,
              avatar: file,
              balance,
            });
          }
        }
      );
    });
  },
};

module.exports = authModel;
