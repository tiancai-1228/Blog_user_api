// DataBase
const config = require("../config/development_config");
const mysqlt = require("mysql");

const connection = mysqlt.createConnection({
  host: "us-cdbr-east-05.cleardb.net",
  user: "b59b8100817979",
  password: "9c40d97c",
  database: "heroku_bbe22ab4e643033",
});

connection.connect((err) => {
  if (err) {
    console.log("connecting error");
  } else {
    console.log("connecting success");
  }
});

module.exports = connection;
