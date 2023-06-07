const db = require("../models");
const DailyList = db.dailyList;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  const data = {
    createdAt: Date(),
    userId: req.body.userId,
    status: true,
  };

  DailyList.create(data)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the List.",
      });
    });
};

// Retrieve all DailyList from the database.
exports.findAll = (req, res) => {
  console.log("dailyyyyyyyyy");

  const createdAt = req.query.createdAt ?? Date();
  var condition = createdAt ? { createdAt: { [Op.gte]: createdAt } } : null;

  DailyList.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving List.",
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  DailyList.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "List was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update List with id=${id}. Maybe List was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating List with id=" + id,
      });
    });
};

// Delete a Product with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  DailyList.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "DailyList was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete DailyList with id=${id}. Maybe Product was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete DailyList with id=" + id,
      });
    });
};