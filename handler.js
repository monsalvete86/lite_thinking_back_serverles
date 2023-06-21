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
const authController = require("./app/controllers/auth.controller");

const app = express();

// parse requests of content-type - application/json
//app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
//app.use(express.urlencoded({ extended: true }));

// database
const db = require("./app/models");
const Role = db.role;

db.sequelize.sync();

/*
// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/product.routes")(app);
require("./app/routes/cliente.routes")(app);
require("./app/routes/company.routes")(app);
require("./app/routes/dailyList.routes")(app);
require("./app/routes/pago.routes")(app);
*/
app.use(function (req, res, next) {
  /*res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, HEAD');
  res.header('Allow', 'GET, POST, PUT, DELETE, OPTIONS, HEAD');*/
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  next();
});

//app.use(helmet());

// compress all responses
//app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var corsOptions = {
  // origin: "https://main.d8b91iarqpg5.amplifyapp.com",
  allowOrigins: ["https://main.d8b91iarqpg5.amplifyapp.com"],
  origin: "http://localhost:8081",
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
    "token",
    "Access-Control-Request-Method",
    "Access-Control-Request-Headers",
    "Access-Control-Allow-Credentials",
  ],
};

const Auxcors = {
  allRoutes: true,
  allowOrigins: "*",
  allowCredentials: true,
  allowMethods: "*",
  allowHeaders: "*",
};
app.use(cors(corsOptions));
//app.use(cors({ origin: true }));

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

app.get(
  "/api/user/:id",
  [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
  (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    return userController.findOne(req, res);
  }
);
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
