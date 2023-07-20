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
    monthlyPayment: {
      type: Sequelize.FLOAT,
      allowNull: true
    },
    statePago: {
      type: Sequelize.STRING
    },
    fechaPago: {
      type: Sequelize.STRING
    },
  });

  Pago.associate = function (models) {
		Pago.belongsTo(models.user, { foreignKey: 'id', sourceKey: 'operatorId' });
	}

  return Pago;
};
