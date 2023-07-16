const db = require("../models");
const Pago = db.pago;
const Client = db.cliente;
const Subscription = db.subscription;
const Op = db.Sequelize.Op;

// Create and Save a new Pago
exports.create = (req, res) => {
  const data = {
    clientId: req.body.clientId,
    subscriptionId: req.body.subscriptionId,
    metodoPago: req.body.metodoPago,
    importe: req.body.importe,
    state: req.body.state,
    fechaPago: req.body.fechaPago
  };

  // Save Pago in the database.
  Pago.create(data)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Pago."
      });
    });
};

// Retrieve all Pagos from the database.
exports.findAll = (req, res) => {
  const importe = req.query.importe;
  var condition = importe ? { importe: { [Op.like]: `%${importe}%` } } : null;

  Pago.findAll({
    where: condition,
    include: [
      Client,
      Subscription,
      {
        model: db.pago,
        where: {
        }
      }
    ]
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving pagos."
      });
    });
};

// Find a single Pago with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Pago.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Pago with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Pago with id=" + id
      });
    });
};

// Update a Pago by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Pago.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Pago was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Pago with id=${id}. Maybe Pago was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Pago with id=" + id
      });
    });
};

// Delete a Pago with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Pago.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Pago was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Pago with id=${id}. Maybe Pago was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Pago with id=" + id
      });
    });
};

