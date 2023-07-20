const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "https://v7bq77felj.execute-api.us-east-2.amazonaws.com"
  // origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Content-Type", "application/json");
  res.header("Accept", "application/json");
  next();
});

// parse requests of content-type - application/json 
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// database
const db = require("./app/models");
const Role = db.role;

// db.sequelize.sync(); 
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

// set port, listen for requests  
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.create({
    id: 1,
    name: "user",
  });

  Role.create({
    id: 2,
    name: "moderator",
  });

  Role.create({
    id: 3,
    name: "admin",
  });
}
