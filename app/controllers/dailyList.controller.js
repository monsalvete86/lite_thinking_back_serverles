const db = require("../models");
const DailyList = db.dailyList;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  const data = {
    userId: req.body.userId,
    status: true,
    date: req.body.date
  };

  DailyList.findOne({
    where: {
      date: data.date,
      status: true
    }
  })
    .then((data) => {
      if (data) {
        res.status(400).send({
          message: "Se ha creado una lista prviamente con la misma fecha y se encuentra activa.",
        });
      } else {
        DailyList.create(data)
          .then((data) => {
            res.send(data);
          })
          .catch((err) => {
            res.status(500).send({
              message: err.message || "Some error occurred while creating the List.",
            });
          });
      }
    })
};

// Retrieve all DailyList from the database.
exports.findAll = (req, res) => {
  const from = req.query.from ?? new Date();
  const to = req.query.to ?? new Date();

  var condition = req.query ? {
    date: {
      [Op.and]: [
        from && { [Op.gte]: from }, // Si from no es nula, agregar condición gte (mayor o igual)
        to && { [Op.lte]: to } // Si to no es nula, agregar condición lte (menor o igual)
      ].filter(Boolean) // Filtrar elementos nulos/undefined
    }
  } : null;

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

// Find a single Product with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  DailyList.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find List with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving List with id=" + id
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
