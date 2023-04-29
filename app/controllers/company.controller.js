const db = require("../models");
const Company = db.company;
const Op = db.Sequelize.Op;

// Create and Save a new company
exports.create = (req, res) => {
  // Validate request
  if (!req.body.nameCompany || !req.body.direction || !req.body.telephone || !req.body.nit) {
    res.status(400).send({
      message: "Incomplete data required!"
    });
    return;
  }

  // Create a company
  const company = {
    nameCompany: req.body.nameCompany,
    direction: req.body.direction,
    nit: parseInt(req.body.nit),
    telephone: req.body.telephone,
  };

  // Save company in the database
  Company.create(company)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message + "sdfsdf " || "Some error occurred while creating the company."
      });
    });
};

// Retrieve all companys from the database.
exports.findAll = (req, res) => {
  const nameCompany = req.query.nameCompany;
  var condition = nameCompany ? { nameCompany: { [Op.like]: `%${nameCompany}%` } } : null;

  Company.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving companys."
      });
    });
};

// Find a single company with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Company.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find company with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving company with id=" + id
      });
    });
};

// Update a company by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Company.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "company was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update company with id=${id}. Maybe company was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating company with id=" + id
      });
    });
};

// Delete a company with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Company.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "company was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete company with id=${id}. Maybe company was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete company with id=" + id
      });
    });
};

/*
// find all published company
exports.findAllPublished = (req, res) => {
  company.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving companys."
      });
    });
};
*/