const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");


exports.allAccess = (req, res) => {
  return "Public Content.";
};

exports.create = (req, res) => {
  // Save User to Database
  const body = req.body;
  const data = {
    username: body.username,
    email: body.email,
    name: body.name,
    companyId: 1,
    last_name: body.last_name,
  }

  if (body.password) {
    data.password = body.password
  }
  User.create(data)
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

exports.findOne = (req, res) => {
  const id = req.params.id;

  User.findByPk(id)
    .then(data => {
      if (data) {

        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find user with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving user with id=" + id
      });
    });
};

// Retrieve all Products from the database.
exports.findAll = (req, res) => {

  User.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    });
};


exports.update = async (req, res) => {
  const id = req.params.id;
  const { username, password, email, name, last_name } = req.body;

  try {
    const user = await User.findByPk(id);
    if (user) {
      user.username = username;
      user.name = name;
      user.last_name = last_name;
      user.email = email;
      user.companyId = 1;

      if (password) {

        var passwordIsEqual = bcrypt.compareSync(
          bcrypt.hashSync(password, 8),
          user.password
        )

        if (!passwordIsEqual) {
          user.password = password
        }
      }
      await user.save();
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateCompany = (req, res) => {

  const { idCompany, idUser } = req.body;

  User.update(
    { companyId: '' + idCompany },
    { where: { id: '' + idUser } }
  )
    .then(result => {
      console.log(result);
      res.status(200).send(result);
    })
    .catch(error => {
      console.log("error:" + error);
      res.status(500).send(error);
    })
}

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};
