const db = require("../helpers/db");
const { v4: uuidv4 } = require("uuid");

// const historyModel = {
//   getHistory: ({ receiver_id, sender_id }) => {
//     return new Promise((resolve, reject) => {
//       db.query(
//         `SELECT * FROM users WHERE id = '${receiver_id}'`,
//         (errorReceiver, resultReceiver) => {
//           // console.log(resultReceiver);
//           if (errorReceiver) {
//             return reject(errorReceiver.message);
//           } else {
//             db.query(
//               `SELECT * FROM users WHERE id = '${sender_id}'`,
//               (errorSender, resultSender) => {
//                 // console.log(resultSender);
//                 if (errorSender) {
//                   return reject(errorSender.message);
//                 } else {
//                   db.query(
//                     `SELECT * FROM transaction WHERE receiver_id = '${resultReceiver.rows[0].id}'`,
//                     (errorAccept, resultAccept) => {
//                       // console.log(resultAccept);
//                       if (errorAccept) {
//                         return reject(errorAccept.message);
//                       } else {
//                         db.query(
//                           // `SELECT * FROM transaction WHERE sender_id = '${sender_id}'`,
//                           `SELECT * FROM transaction WHERE sender_id = '${resultSender.rows[0].id}'`,
//                           (errorTransfer, resultTransfer) => {
//                             console.log(resultTransfer);
//                             if (errorTransfer) {
//                               return reject(errorTransfer.message);
//                             } else {
//                               return resolve({
//                                 ...resultReceiver.rows[0],
//                                 // income: resultAccept.rows,
//                                 // expense: resultTransfer.rows,
//                                 history: [
//                                   ...resultAccept.rows,
//                                   ...resultTransfer.rows,
//                                 ],
//                               });
//                             }
//                           }
//                         );
//                       }
//                     }
//                   );
//                 }
//               }
//             );
//           }
//         }
//       );
//     });
//   },
// };
const historyModel = {
  getHistory: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM users WHERE id = '${id}'`, (error, result) => {
        if (error) {
          return reject(error.message);
        } else {
          db.query(
            `SELECT * FROM transaction WHERE receiver_id = '${result.rows[0].id}'`,
            (errorAccept, resultAccept) => {
              if (errorAccept) {
                return reject(errorAccept.message);
              } else {
                db.query(
                  `SELECT * FROM transaction WHERE sender_id = '${id}'`,
                  (errorTransfer, resultTransfer) => {
                    if (errorTransfer) {
                      return reject(errorTransfer.message);
                    } else {
                      return resolve({
                        ...result.rows[0],
                        // income: result2.rows,
                        // expense: resultExpense.rows,
                        history: [...resultAccept.rows, ...resultTransfer.rows],
                      });
                    }
                  }
                );
              }
            }
          );
        }
      });
    });
  },
};
module.exports = historyModel;
