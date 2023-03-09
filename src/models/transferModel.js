const db = require("../helpers/db");
const { v4: uuidv4 } = require("uuid");

const transferModel = {
  transfer: ({ id, id2, balance, amount }) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM users WHERE id = '${id}'`,
        (errorSelect, resultSelect) => {
          if (errorSelect) {
            return reject(errorSelect.message);
          } else {
            db.query(
              `UPDATE users SET balance = ${
                parseInt(resultSelect.rows[0].balance) + parseInt(amount)
              } WHERE id = '${id}'`,
              (error, result) => {
                if (error) {
                  return reject(error.message);
                } else {
                  db.query(
                    `SELECT * FROM users WHERE id = '${id2}'`,
                    (errorSelect2, resultSelect2) => {
                      // console.log(resultSelect.rows, resultSelect2.rows);
                      if (errorSelect2) {
                        return reject(errorSelect2.message);
                      } else {
                        db.query(
                          `INSERT INTO transaction (transaction_id, receiver_id, sender_id, amount) VALUES ($1,$2, $3, $4)`,
                          [
                            uuidv4(),
                            resultSelect.rows[0].id,
                            resultSelect2.rows[0].id,
                            amount,
                          ],
                          (errorInsert, resultInsert) => {
                            if (errorInsert) {
                              return reject(errorInsert.message);
                            } else {
                              db.query(
                                `UPDATE users SET balance = ${
                                  parseInt(resultSelect2.rows[0].balance) -
                                  parseInt(amount)
                                } WHERE id = '${id2}'`,
                                (errorUpdateSender, resultUpdateSender) => {
                                  if (errorUpdateSender) {
                                    return reject(errorUpdateSender);
                                  } else {
                                    return resolve({
                                      id,
                                      id2,
                                      receiver_name:
                                        resultSelect.rows[0].first_name,
                                      sender_name:
                                        resultSelect2.rows[0].first_name,
                                      balance_receiver_before:
                                        resultSelect.rows[0].balance,
                                      balance_sender_before:
                                        resultSelect2.rows[0].balance,
                                      amount,
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
                }
              }
            );
          }
        }
      );
    });
  },
};

module.exports = transferModel;

// transfer: ({ id, id2, balance, amount }) => {
//   return new Promise((resolve, reject) => {
//     db.query(
//       `SELECT * FROM users WHERE id = '${id}'`,
//       (errorSelect, resultSelect) => {
//         if (errorSelect) {
//           return reject(errorSelect.message);
//         } else {
//           db.query(
//             `UPDATE users SET balance = ${
//               parseInt(resultSelect.rows[0].balance) + parseInt(amount)
//             } WHERE id = '${id}'`,
//             (error, result) => {
//               if (error) {
//                 return reject(error.message);
//               } else {
//                 db.query(
//                   `SELECT * FROM users WHERE id = '${id2}'`,
//                   (errorSelect2, resultSelect2) => {
//                     if (errorSelect2) {
//                       return reject(errorSelect2.message);
//                     } else {
//                       db.query(
//                         `INSERT INTO transaction (transaction_id, receiver_id, sender_id, amount) VALUES ($1,$2, $3, $4)`,
//                         [
//                           uuidv4(),
//                           resultSelect.rows[0].id,
//                           resultSelect2.rows[0].id,
//                           amount,
//                         ],
//                         (errorInsert, resultInsert) => {
//                           if (errorInsert) {
//                             return reject(errorInsert.message);
//                           } else {
//                             db.query(
//                               `UPDATE users SET balance = ${
//                                 parseInt(resultSelect2.rows[0].balance) -
//                                 parseInt(amount)
//                               } WHERE id = '${id2}'`,
//                               (errorUpdateSender, resultUpdateSender) => {
//                                 if (errorUpdateSender) {
//                                   return reject(errorUpdateSender);
//                                 } else {
//                                   return resolve({
//                                     id,
//                                     id2,
//                                     receiver_name:
//                                       resultSelect.rows[0].first_name,
//                                     sender_name:
//                                       resultSelect2.rows[0].first_name,
//                                     balance_receiver_before:
//                                       resultSelect.rows[0].balance,
//                                     balance_sender_before:
//                                       resultSelect2.rows[0].balance,
//                                     amount,
//                                   });
//                                 }
//                               }
//                             );
//                           }
//                         }
//                       );
//                     }
//                   }
//                 );
//               }
//             }
//           );
//         }
//       }
//     );
//   });
// },
