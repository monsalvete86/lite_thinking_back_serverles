const db = require("../models");
const Processor = db.processor;
const Op = db.Sequelize.Op;

// Create and Save a new Processor
exports.create = (req, res) => {
  // Validate request
  if (!req.body.processorName) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Processor
  const processor = {
    processorName: req.body.processorName
  };

  // Save Processor in the database
  Processor.create(processor)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Processor."
      });
    });
};

// Retrieve all Products from the database.
exports.findAll = (req, res) => {
  const processorName = req.query.processorName;
  var condition = processorName ? { processorName: { [Op.like]: `%${processorName}%` } } : null;

  Processor.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving processors."
      });
    });
};

// Find a single Processor with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Processor.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Processor with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Processor with id=" + id
      });
    });
};

// Update a Processor by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Processor.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Processor was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Processor with id=${id}. Maybe Processor was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Processor with id=" + id
      });
    });
};

// Delete a Processor with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Processor.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Processor was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Processor with id=${id}. Maybe Processor was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Processor with id=" + id
      });
    });
};

