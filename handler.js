


const serverless = require("serverless-http");
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const bodyParser = require('body-parser');
const compression = require('compression');

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
const Role = db.role

db.sequelize.sync();
/*
// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/product.routes')(app);
require('./app/routes/company.routes')(app);
*/

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Headers', '*')
  res.header('Access-Control-Allow-Origin', '*')
  res.header("Content-Type", "application/json");
  next()
})

app.use(helmet());

// compress all responses
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var corsOptions = {
  origin: "https://main.d8b91iarqpg5.amplifyapp.com",
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.post("/api/auth/signin",  (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Content-Type", "application/json");
  res.header("Accept", "application/json");
  return authController.signin(req, res); 
});

app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    (req, res, next) => {
      return authController.signup(req, res);
  });
  
app.get(
    "/api/company/:id",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    (req, res, next) => {
      return companyControler.signup(req, res);
  });

app.get("/test_all",  (req, res, next) => {
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
  return res.status(404).json({
    error: "Not Found",
  });
});



module.exports.handler = serverless(app);
