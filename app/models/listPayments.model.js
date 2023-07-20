
module.exports = (sequelize, Sequelize) => {
  const ListPayments = sequelize.define("listPayments", {
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
    operatorId: {
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
      type: Sequelize.INTEGER
    },
    fechaPago: {
      type: Sequelize.STRING
    },
  });

  return ListPayments;
};
