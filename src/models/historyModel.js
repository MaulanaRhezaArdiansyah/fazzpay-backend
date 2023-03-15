const db = require("../helpers/db");
const { v4: uuidv4 } = require("uuid");

const historyModel = {
  getHistory: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM users WHERE id = '${id}'`, (error, result) => {
        if (error) {
          return reject(error.message);
        } else {
          db.query(
            `SELECT * FROM transaction WHERE receiver_id = '${id}' 
            UNION
            SELECT * FROM transaction WHERE sender_id = '${id}'
            `,
            (error2, result2) => {
              if (error2) {
                return reject(error2.message);
              } else {
                return resolve({
                  ...result.rows[0],
                  history: result2.rows,
                });
              }
            }
          );
        }
      });
    });
  },
};
// const historyModel = {
//   getHistory: (id) => {
//     return new Promise((resolve, reject) => {
//       db.query(`SELECT * FROM users WHERE id = '${id}'`, (error, result) => {
//         if (error) {
//           return reject(error.message);
//         } else {
//           db.query(
//             `SELECT * FROM transaction WHERE receiver_id = '${result.rows[0].id}'`,
//             (errorAccept, resultAccept) => {
//               if (errorAccept) {
//                 return reject(errorAccept.message);
//               } else {
//                 db.query(
//                   `SELECT * FROM transaction WHERE sender_id = '${id}'`,
//                   (errorTransfer, resultTransfer) => {
//                     if (errorTransfer) {
//                       return reject(errorTransfer.message);
//                     } else {
//                       return resolve({
//                         ...result.rows[0],
//                         // income: result2.rows,
//                         // expense: resultExpense.rows,
//                         history: [...resultAccept.rows, ...resultTransfer.rows],
//                       });
//                     }
//                   }
//                 );
//               }
//             }
//           );
//         }
//       });
//     });
//   },
// };
module.exports = historyModel;
