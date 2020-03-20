const productModel = require("../models/product");
const userModel = require("../models/user");
const shopModel = require("../models/shop");
//const miscHelper = require('../helpers/helpers');
const miscHelper = require("../helpers/helpers4");
var jwt = require("jsonwebtoken");
module.exports = {
  getLogin: (req, res) => {
    const { nama, password } = req.body;
    const data = {
      nama,
      password
    };
    console.log("yee");
    userModel.getlogin(nama, password).then(result => {
      //console.log(result)

      for (let i = 0; i < result.length; i++) {
        if (
          data.nama == result[i].nama &&
          data.password == result[i].password
        ) {
          var token = jwt.sign(
            { id: data.nama, name: data.password },
            process.env.PRIVATE_KEY
          );
          res.json({
            token: token
          });
          console.log("yeee");
          shopModel.updateStatus(result[i].id).then(result_1 => {});
        } else {
          res.json("Wrong Username or Password");
        }
      }
    });
  },
  register: (req, res) => {
    const { nama, password } = req.body;
    const data = {
      nama,
      password
    };
    userModel
      .register(data)
      .then(result => {})
      .catch(err => console.log(err));
  }
};
