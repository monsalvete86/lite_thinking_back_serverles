const db = require("../models");
const Subscription = db.subscription;
const Client = db.cliente;
const Operator = db.user;
const Pago = db.pago;
const Op = db.Sequelize.Op;

const today = () => {
  return new Date().toLocaleString('en-us', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/(\d+)\/(\d+)\/(\d+)/, '$3-$1-$2')
}

const dateLate = () => {
  let today = new Date();
  today.setDate(today.getDate() + 3)
  return today.toLocaleString('en-us', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/(\d+)\/(\d+)\/(\d+)/, '$3-$1-$2');
}
// Create and Save a new Subscription.
exports.create = (req, res) => {

  // Create a Subscription
  // const subscription = req.body;
  const data = {
    clientId: req.body.clientId,
    operatorId: req.body.operatorId,
    dailyListId: req.body.dailyListId
  };

  // Save Subscription in the database.
  Subscription.create(data)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Subscription."
      });
    });
};

// Optimizes performance by reducing state updates and renders Subscription.
exports.bulkCreate = (req, res) => {
  const data = req.body;

  Subscription.bulkCreate(data, {
    fields: ["id", "operatorId", "clientId", "dailyListId"],
    updateOnDuplicate: ["operatorId"]
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err || "Some error occurred while creating the List.",
      });
    });
};

// Retrieve all Subscriptions from the database.
exports.findAll = (req, res) => {
  var conditions = {}

  if (req.userId) { conditions.operatorId = req.userId }
  if (req.query.state) { conditions.state = req.query?.state != '' ? req.query.state : 'ACCEPTED' }
  if (req.query.clientes) { conditions.cliente.nombre = req.query?.state != '' ? req.query.state : 'ACCEPTED' }
  Subscription.findAll({
    where: conditions,
    include: [
      Client,
      Operator
    ]
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving subscriptions."
      });
    });
};

// Unit or integration tests for interacting with and asserting component elements.
exports.findAllByDailyList = (req, res) => {

  const dailyListId = req.params.dailyListId ?? null;
  var condition = dailyListId ? { dailyListId: dailyListId } : null;

  Subscription.findAll({ where: condition, include: [Client, Operator] })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving List.",
      });
    });
};

exports.findAllWithPayments = (req, res) => {
  var conditions = {}

  if (req.userId) { conditions.operatorId = req.userId }

  Subscription.findAll({
    where: conditions,
    include: [
      Client,
      Operator,
      {
        model: db.dailyList,
        where: {
          date: today()
        }
      },
      {
        model: db.pago,
        where: {
          state: req.query.state
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
          err.message || "Some error occurred while retrieving subscriptions."
      });
    });
};

// Find a single Subscription with an id.
exports.findOne = (req, res) => {
  const id = req.params.id;

  Subscription.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Subscription with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Subscription with id=" + id
      });
    });
};

// Update a Subscription by the id in the request.
exports.update = (req, res) => {
  const id = req.params.id;

  Subscription.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Subscription was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Subscription with id=${id}. Maybe Subscription was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).send({
        message: "Error updating Subscription with id=" + id,
        error: err
      });
    });
};

// Delete a Subscription with the specified id in the request.
exports.delete = (req, res) => {
  const id = req.params.id;

  Subscription.destroy({
    where: { id: id, state: 'GENERATED' }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Subscription was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Subscription with id=${id}. The subscription has already been processed`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Subscription with id=" + id
      });
    });
};

