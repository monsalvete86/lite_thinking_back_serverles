const db = require("../models");
const Cliente = db.cliente;
const Op = db.Sequelize.Op;

// Create and Save a new Cliente
exports.create = (req, res) => {
  // Validate request
  if (!req.body.clienteName || !req.body.code || !req.body.stock ) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Cliente 
  const cliente = {
    code: req.body.code,
    clienteName: req.body.clienteName,
    stock: req.body.stock,
    companyId: req.body.companyId,
  };

  // Save Cliente in the database
  Cliente.create(cliente)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Cliente."
      });
    });
};

// Retrieve all Clientes from the database.
exports.findAll = (req, res) => {
  const clienteName = req.query.clienteName;
  var condition = clienteName ? { clienteName: { [Op.like]: `%${clienteName}%` } } : null;

  Cliente.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving clientes."
      });
    });
};

// Find a single Cliente with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Cliente.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Cliente with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Cliente with id=" + id
      });
    });
};

// Update a Cliente by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Cliente.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Cliente was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Cliente with id=${id}. Maybe Cliente was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Cliente with id=" + id
      });
    });
};

// Delete a Cliente with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Cliente.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Cliente was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Cliente with id=${id}. Maybe Cliente was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Cliente with id=" + id
      });
    });
};

