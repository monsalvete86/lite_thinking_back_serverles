const Company = require("./company.model");

module.exports = (sequelize, Sequelize) => {
  const Pago = sequelize.define("pagos", {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: Sequelize.INTEGER
    },
    importe: {
      type: Sequelize.STRING
    },
    status: {
      type: Sequelize.STRING
    },
    fechaPago: {
      type: Sequelize.STRING
    },
  });

  return Pago;
};
