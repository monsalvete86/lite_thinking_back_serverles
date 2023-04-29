const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  // Save User to Database
  const body = req.body;
  User.create({
    username: body.username,
    email: body.email,
    password: bcrypt.hashSync(body.password, 8)
  })
    .then(user => {
      if (body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: body.roles
            }
          }
        }).then(roles => {
          user.setRoles(roles).then(() => {
            res.send({ message: "User registered successfully!" });
          });
        });
      } else {
        // user role = 1
        user.setRoles([1]).then(() => {
          res.send({ message: "User registered successfully!" });
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.header('Access-Control-Allow-Credentials', true); 
  /*res.header("Access-Control-Allow-Methods", "*");
  res.header("Content-Type", "application/json");*/
  //res.header("Accept", "application/json");

  const body =  req.body;
  console.log('entraaaaaa');
  User.findOne({
    where: {
      username: "" + body.username
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      var passwordIsValid = bcrypt.compareSync(
        body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      var authorities = [];
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        return {
          statusCode: 200,
          body: JSON.stringify({
            id: user.id,
            username: user.username,
            email: user.email,
            roles: authorities,
            companyId: user.companyId,
            accessToken: token
          }),
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
          },
        };
      });
      return res.status(200).json({
        id: user.id,
        username: user.username,
        email: user.email,
        roles: authorities,
        companyId: user.companyId,
        accessToken: token
      });
      console.log('pasa hasta aca');
    })
    .catch(err => {
      res.status(500).send({ message: body.username });
    });
};
