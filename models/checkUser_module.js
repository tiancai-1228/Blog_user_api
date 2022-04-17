const db = require("./connection_db");

module.exports = function checkUser(id) {
  let result = {};
  return new Promise((resolve, reject) => {
    // 找尋

    db("SELECT * FROM member_info WHERE id = ?", [id], function (err, rows) {
      if (err) {
        result.status = "false";
        result.err = "伺服器錯誤，請稍後在試！";
        reject(result);
        return;
      }
      resolve(rows);
    });
  });
};
