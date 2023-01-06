const express = require("express");
//const express = require('serverless-express/express')
//const slshttp = require('serverless-http')
const helmet = require("helmet");
const cors = require("cors");
const bodyParser = require('body-parser');
const compression = require('compression');


const app = express();

var corsOptions = {
  origin: "https://main.d8b91iarqpg5.amplifyapp.com"
};

app.use(cors(corsOptions));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Accept, Authorization");
  next()
})

// parse requests of content-type - application/json
//app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
//app.use(express.urlencoded({ extended: true }));
//app.use(bodyParser.json({ strict: false }));
app.use(helmet());

// compress all responses
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// database
const db = require("./app/models");
const Role = db.role;

db.sequelize.sync();
// force: true will drop the table if it already exists
// db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync Database with { force: true }');
//   initial();
// });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to test application." });
});

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/product.routes')(app);
require('./app/routes/company.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.create({
    id: 1,
    name: "user"
  });
 
  Role.create({
    id: 2,
    name: "moderator"
  });
 
  Role.create({
    id: 3,
    name: "admin"
  });
}

module.exports = app;