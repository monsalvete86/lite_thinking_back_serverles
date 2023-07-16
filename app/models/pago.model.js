const Company = require("./company.model");

module.exports = (sequelize, Sequelize) => {
  const Pago = sequelize.define("pagos", {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: Sequelize.INTEGER
    },
    clientId: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: require('./cliente.model.js')(sequelize, Sequelize),
        key: 'id'
      }
    },
    subscriptionId: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: require('./subscription.model.js')(sequelize, Sequelize),
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
