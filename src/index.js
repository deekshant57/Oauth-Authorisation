const express = require("express");

const app = express();

const userController = require("./controllers/user.controller");

const { register, login } = require("./controllers/auth.controller");

app.use(express.json());

app.use("/user", userController);

app.use("/register", register);

app.use("/login", login);

module.exports = app;
