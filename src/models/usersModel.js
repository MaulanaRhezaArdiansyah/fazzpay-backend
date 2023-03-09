const db = require("../helpers/db");
const { v4: uuidv4 } = require("uuid");

const usersModel = {
  get: (queryParams) => {
    const { search = "", limit = 4, sort = "asc", page = 1 } = queryParams;
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM users ${
          search
            ? `WHERE first_name ILIKE '%${search}%' OR last_name ILIKE '%${search}%'`
            : ""
        } ORDER BY first_name ${sort} LIMIT ${limit} OFFSET ${
          (page - 1) * limit
        }`,
        (error, result) => {
          if (error) {
            return reject(error.message);
          }
          return resolve(result.rows);
        }
      );
    });
  },
  getDetail: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM users WHERE id = '${id}'`, (error, result) => {
        if (error) {
          return reject(error.message);
        }
        return resolve(result.rows);
      });
    });
  },
  remove: (id) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM users WHERE id = '${id}'`,
        (errorSelect, resultSelect) => {
          if (errorSelect) {
            return reject(errorSelect.message);
          }
          db.query(`DELETE FROM users WHERE id = '${id}'`, (error, result) => {
            if (error) {
              return reject(error.message);
            }
            return resolve(resultSelect);
          });
        }
      );
    });
  },
  updateBalanceTopUp: ({ id, balance }) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM users WHERE id = '${id}'`,
        (errorSelect, resultSelect) => {
          if (errorSelect) {
            return reject(errorSelect.message);
          } else {
            db.query(
              `
              UPDATE users SET balance = ${
                parseInt(resultSelect.rows[0].balance) + parseInt(balance)
              } WHERE id = '${id}'`,
              (error, result) => {
                if (error) {
                  return reject(error.message);
                } else {
                  db.query(
                    `INSERT INTO transaction (transaction_id, receiver_id, sender_id, amount) VALUES ($1, $2, $3, $4)`,
                    [
                      uuidv4(),
                      resultSelect.rows[0].id,
                      resultSelect.rows[0].id,
                      balance,
                    ],
                    (errorInsert, resultInsert) => {
                      if (errorInsert) {
                        return reject(errorInsert.message);
                      } else {
                        return resolve({
                          id,
                          balance_before: resultSelect.rows[0].balance,
                          balance,
                        });
                      }
                    }
                  );
                }
              }
            );
          }
        }
      );
    });
  },
  updatePhone: ({ id, phone }) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM users WHERE id = '${id}'`,
        (errorSelect, resultSelect) => {
          if (errorSelect) {
            return reject(errorSelect.message);
          } else {
            db.query(
              `
              UPDATE users SET phone = '${phone}' WHERE id = '${id}'`,
              (error, result) => {
                if (error) {
                  return reject(error.message);
                } else {
                  return resolve({ id, phone });
                }
              }
            );
          }
        }
      );
    });
  },
  updateAvatar: ({ id, file }) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM users WHERE id = '${id}'`,
        (errorSelect, resultSelect) => {
          if (errorSelect) {
            return reject(errorSelect.message);
          } else {
            db.query(
              `
              UPDATE users SET avatar = '${
                file ? file.filename : resultSelect.rows[0].avatar
              }' WHERE id = '${id}'`,
              (error, result) => {
                if (error) {
                  return reject(error.message);
                } else {
                  return resolve({ id, avatar: file });
                }
              }
            );
          }
        }
      );
    });
  },
};

module.exports = usersModel;
