"use strict";

const serverless = require("serverless-http");
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const bodyParser = require("body-parser");
const compression = require("compression");
const { authJwt } = require("./app/middleware/index");
const { verifySignUp } = require("./app/middleware");
const userController = require("./app/controllers/user.controller");
const companyControler = require("./app/controllers/company.controller");
const clientControler = require("./app/controllers/cliente.controller");
const authController = require("./app/controllers/auth.controller");

const app = express();

var corsOptions = {
  // origin: "https://main.d8b91iarqpg5.amplifyapp.com",
  // allowOrigins: ["https://main.d8b91iarqpg5.amplifyapp.com"],
  // origin: "http://localhost:8081",
  origin: "https://main.d2a11ffht6x4z4.amplifyapp.com",
  optionSuccessStatus: 200,
  credentials: true,
  methods: "GET,HEAD,PUT,OPTIONS,POST,DELETE",
  allowedHeaders: [
    "Access-Control-Allow-Headers",
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "Authorization",
    "X-Access-Token:",
    "token",
    "Access-Control-Request-Method",
    "Access-Control-Request-Headers",
    "Access-Control-Allow-Credentials",
  ],
};

//app.use(cors(corsOptions));
app.use(cors({
  origin: '*',
  allowedHeaders: ['Authorization',"X-Access-Token:","Content-Type"],
  credentials: true,
}));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  // res.header("Access-Control-Allow-Headers", "*");
  res.header("Content-Type", "application/json");
  res.header('Access-Control-Allow-Credentials', true); 
  res.header("Access-Control-Allow-Headers", "Autorization", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
  next();
});

//app.use(helmet());

app.use(bodyParser.json());
// app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
const Role = db.role;

// db.sequelize.sync();

app.get("/", (req, res) => {
  res.json({ message: "Welcome to test application." });
})
/*
app.post("/api/auth/signin", cors(), (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  //res.header("Content-Type", "application/json");
  return authController.signin(req, res);
});

app.post(
  "/api/auth/signup",
  [verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRolesExisted],
  (req, res, next) => {
    return authController.signup(req, res);
  }
);

app.get(
  "/api/company/:id",
  [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
  (req, res, next) => {
    return companyControler.findOne(req, res);
  }
);
*/
require("./app/routes/auth.routes")(app);
require("./app/routes/role.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/product.routes")(app);
require("./app/routes/cliente.routes")(app);
require("./app/routes/company.routes")(app);
require("./app/routes/dailyList.routes")(app);
require("./app/routes/processor.routes")(app);
require("./app/routes/subscription.routes")(app);
require("./app/routes/pago.routes")(app);
/*
app.get(
  "/api/user/:id",
  // [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
  (req, res, next) => {
    // res.header("Access-Control-Allow-Origin", "*");
    return userController.findOne(req, res);
  }
);
*/
app.get("/test_all", (req, res, next) => {
  return companyControler.findAll(req, res);
});

app.get("/", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from root!",
  });
});

app.get("/hello", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from path!",
  });
});

app.use((req, res, next) => {
  return res;
  // return res.status(404).json({
  //   error: "Not Found",
  // });
});

module.exports.handler = serverless(app);
