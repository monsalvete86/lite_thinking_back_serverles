const db = require("../models");
const Subscription = db.subscription;
const Client = db.cliente;
const Op = db.Sequelize.Op;

// Create and Save a new Subscription
exports.create = (req, res) => {

  // Create a Subscription
  // const subscription = req.body;
  const data = {
    clientId: req.body.clientId,
    operatorId: req.body.operatorId,
    dailyListId: req.body.dailyListId
  };

  // Save Subscription in the database
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

exports.bulkCreate = (req, res) => {
  const data = req.body;

  Subscription.bulkCreate(data)
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
  // const subscriptionName = req.query.subscriptionName;
  var condition = req.userId ? { operatorId: req.userId } : null;

  Subscription.findAll({ where: condition, include: Client })
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

exports.findAllByDailyList = (req, res) => {

  const dailyListId = req.params.dailyListId ?? null;
  var condition = dailyListId ? { dailyListId: dailyListId } : null;

  Subscription.findAll({ where: condition, include: Client })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving List.",
      });
    });
};


// Find a single Subscription with an id
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

// Update a Subscription by the id in the request
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
      res.status(500).send({
        message: "Error updating Subscription with id=" + id
      });
    });
};

// Delete a Subscription with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Subscription.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Subscription was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Subscription with id=${id}. Maybe Subscription was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Subscription with id=" + id
      });
    });
};

