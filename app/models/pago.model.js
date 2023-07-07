const Company = require("./company.model");
const Subscription = require("./subscription.model");

module.exports = (sequelize, Sequelize) => {
  const Pago = sequelize.define("pagos", {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: Sequelize.INTEGER
    },
    cliente: {
      type: Sequelize.STRING
    },
    subscription: {
      type: Sequelize.INTEGER,
				allowNull: true,
				references: {
					model: Subscription,
					key: 'id'
				}
    },
    metodoPago: {
      type: Sequelize.STRING
    },
    importe: {
      type: Sequelize.STRING
    },
    state: {
      type: Sequelize.STRING
    },
    fechaPago: {
      type: Sequelize.STRING
    },
  });

  return Pago;
};
