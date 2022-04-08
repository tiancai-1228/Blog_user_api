// DataBase
const config = require("../config/development_config");
const mysqlt = require("mysql");

const pool = mysqlt.createPool({
  host: "us-cdbr-east-05.cleardb.net",
  user: "b59b8100817979",
  password: "9c40d97c",
  database: "heroku_bbe22ab4e643033",
});

var query = function (sql, options, callback) {
  console.log(sql, options, callback);
  if (typeof options === "function") {
    callback = options;
    options = undefined;
  }
  pool.getConnection(function (err, conn) {
    if (err) {
      callback(err, null, null);
    } else {
      conn.query(sql, options, function (err, results, fields) {
        // callback
        callback(err, results, fields);
      });
      // connection 的釋放需要在此 release，而不能在 callback 中 release
      conn.release();
    }
  });
};

module.exports = query;
