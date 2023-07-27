const db = require("../models");
const Pago = db.pago;
const Client = db.cliente;
const Operator = db.user;
const Subscription = db.subscription;
const Op = db.Sequelize.Op;
const sequelize = db.sequelize;

// Create and Save a new Pago
exports.create = (req, res) => {
  const data = {
    clientId: req.body.clientId,
    subscriptionId: req.body.subscriptionId,
    operatorId: req.body.operatorId,
    metodoPago: req.body.metodoPago,
    importe: req.body.importe,
    monthlyPayment: req.body.monthlyPayment,
    statePago: req.body.statePago,
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
  var conditions = {}
  var subscriptionConditions = {
    [Op.and]: [
      sequelize.literal(`id IS NOT NULL`)
    ]
  }

  const paymentStateFilter = req.params.paymentStateFilter != 'empty' ? req.params.paymentStateFilter : '';
  const today = new Date();
  const month = today.getMonth();
  const year = today.getFullYear();
  const currentDay = new Date().getDate();

  switch (paymentStateFilter) {
    case 'PAGADO':
      const consult = `(
        SELECT DISTINCT subscriptionId FROM pagos
        WHERE "subscriptionId" IS NOT NULL
        AND  statePago = true
        AND fechaPago BETWEEN '${new Date(year, month, 1).toISOString()}' AND '${new Date(year, month + 1, 0).toISOString()}'
      )`;
      conditions.id = {
        [Op.in]: sequelize.literal(consult)
      };
      break;

     case 'PORVENCER':
      const consultP = `(
        SELECT DISTINCT subscriptionId FROM pagos
        WHERE "subscriptionId" IS NOT NULL
        AND  statePago = true
        AND fechaPago BETWEEN '${new Date(year, month, 1).toISOString()}' AND '${new Date(year, month + 1, 0).toISOString()}'
      )`;
      conditions.id = {
        [Op.notIn]: sequelize.literal(consultP)
      };

      conditions = {
        ...conditions,
        [Op.and]: [
          sequelize.literal(`EXTRACT(DAY FROM startCoverage) <= ${currentDay}`), // Día del campo startDate menor o igual al día actual
          sequelize.literal(`EXTRACT(DAY FROM startCoverage) >= ${currentDay - 5}`), // Día del campo startDate mayor o igual al día actual menos 5 días
        ],
      }


      break;

    case 'VENCIDO':
      const consultv = `(
        SELECT DISTINCT subscriptionId FROM pagos
        WHERE "subscriptionId" IS NOT NULL
        AND  statePago = true
        AND fechaPago BETWEEN '${new Date(year, month, 1).toISOString()}' AND '${new Date(year, month + 1, 0).toISOString()}'
      )`;
      conditions.id = {
        [Op.notIn]: sequelize.literal(consultv)
      };

      const auxFilterV =  sequelize.literal(`EXTRACT(DAY FROM startCoverage) > ${currentDay}`);
      conditions = {
        ...conditions,
        auxFilterV
      }
      break;
    default:
      //Declaraciones ejecutadas cuando ninguno de los valores coincide con el valor de la expresión
      break;
  }
  conditions.state = 'ACCEPTED';
  const currentMonth = new Date();
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
  const lastDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);

  Subscription.findAll({
    where: conditions,
    include: [
      Client,
      Operator,
      {
        model: Pago,
        required: false,
        where: {
          fechaPago: {
            [Op.and]: [
              { [Op.gte]: firstDayOfMonth }, // Fecha de pago mayor o igual al primer día del mes actual
              { [Op.lte]: lastDayOfMonth },  // Fecha de pago menor o igual al último día del mes actual
            ],
          },
          statePago: true
        }
      },
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

exports.pagoSubscription = (req, res) => {
  let subscriptionId = req.params.subscriptionId
  Pago.findAll({
    where: {
      subscriptionId: subscriptionId
    },
    include: [
      Subscription,
      Operator
    ],
    order: [
      ['fechaPago', 'DESC']
    ]
  })
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Cliente with id=${subscriptionId}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message
      });
    });
}
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


