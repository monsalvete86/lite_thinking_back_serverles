const db = require("../models");
const ListPayments = db.pago;
const Op = db.Sequelize.Op;

// Create and Save a new ListPayments
exports.create = (req, res) => {
  const data = {
    clientId: req.body.clientId,
    subscriptionId: req.body.subscriptionId,
    metodoPago: req.body.metodoPago,
    operatorId: req.body.operatorId,
    importe: req.body.importe,
    monthlyPayment: req.body.monthlyPayment,
    statePago: req.body.statePago,
    fechaPago: req.body.fechaPago
  };

  // Save ListPayments in the database.
  ListPayments.create(data)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the ListPayments."
      });
    });
};

// Retrieve all ListPaymentss from the database.
exports.findAll = (req, res) => {
  const importe = req.query.importe;
  var conditions = importe ? { importe: { [Op.like]: `%${importe}%` } } : null;

  ListPayments.findAll({
    where: conditions,
    order: [
      ['fechaPago', 'DESC']
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

// Find a single ListPayments with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  ListPayments.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find ListPayments with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving ListPayments with id=" + id
      });
    });
};

// Update a ListPayments by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  ListPayments.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "ListPayments was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update ListPayments with id=${id}. Maybe ListPayments was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating ListPayments with id=" + id
      });
    });
};

// Delete a ListPayments with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  ListPayments.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "ListPayments was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete ListPayments with id=${id}. Maybe ListPayments was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete ListPayments with id=" + id
      });
    });
};

// Función para cancelar un pago por su ID
exports.cancelPayment = (req, res) => {
  const id = req.params.id;

  ListPayments.update({ statePago: false }, {
    where: { id: id }
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Payment was canceled successfully.",
        });
      } else {
        res.status(404).send({
          message: `Cannot cancel Payment with id=${id}. Maybe Payment was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error canceling Payment with id=" + id,
      });
    });
};