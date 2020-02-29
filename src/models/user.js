require("dotenv").config();
const connection = require("../configs/db");

module.exports = {
  getlogin: (nama, password) => {
    return new Promise((resolve, reject) => {
      connection.query("SELECT id,nama,password FROM user", (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
  register: data => {
    return new Promise((resolve, reject) => {
      connection.query("INSERT INTO user SET ?", data, (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  }
};
