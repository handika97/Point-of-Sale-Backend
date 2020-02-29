const express = require("express");
const Router = express.Router();
const userController = require("../controllers/user");
const auth = require("../helpers/auth");
Router.post("/", userController.getLogin).post(
  "/register",
  userController.register
);
module.exports = Router;
