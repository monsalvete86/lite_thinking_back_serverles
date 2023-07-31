const db = require("../models");
const DailyList = db.dailyList;
const Subscription = db.subscription;
const User = db.user;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  const dataSubscription = {
    userId: req.userId,
    status: true,
    date: req.body.date
  };

  DailyList.findOne({
    where: {
      date: dataSubscription.date,
      status: true
    }
  })
    .then((data) => {
      if (data) {
        res.status(400).send({
          message: "Se ha creado una lista previamente con la misma fecha y se encuentra activa.",
        });
      } else {
        DailyList.create(dataSubscription)
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
  const from = (req.query.from) ?? new Date();
  const to = (req.query.to) ?? new Date();

  var condition = req.query ? {
    date: {
      [Op.and]: [
        from && { [Op.gte]: from }, // Si from no es nula, agregar condición gte (mayor o igual)
        to && { [Op.lte]: to } // Si to no es nula, agregar condición lte (menor o igual)
      ].filter(Boolean) // Filtrar elementos nulos/undefined
    }
  } : null;

  DailyList.findAll({ where: condition, include: [User] })
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

  DailyList.findByPk(id, {
    include: {
      model: Subscription
    }
  })
    .then((dailyList) => {
      if (!dailyList) {
        res.send('No se encontró la Lista');
        return;
      }

      let subscriptions = dailyList.subscriptions.filter(value =>
        value.state !== "GENERATED" && value.state !== null
      )

      if (subscriptions.length > 0) {
        res.send({ message: 'No se puede eliminar la Lista porque contiene suscripciones procesadas', data: subscriptions })
        console.log('No se puede eliminar la Lista');
      } else {
        dailyList.destroy()
          .then(() => {
            res.send('Lista eliminada');
          })
          .catch((error) => {
            res.send('Error al eliminar la Lista:', error);
          });
      }
    })
    .catch((error) => {
      res.send('Error al buscar la Lista:', error);
    });
};
