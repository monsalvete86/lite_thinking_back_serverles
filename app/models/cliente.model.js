const Company = require("./company.model");

module.exports = (sequelize, Sequelize) => {
  const Cliente = sequelize.define("clientes", {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: Sequelize.INTEGER
    },
    nombre: {
      type: Sequelize.STRING
    },
    apellido: {
      type: Sequelize.STRING
    },
    direccion: {
      type: Sequelize.STRING
    },
    ciudad: {
      type: Sequelize.STRING
    },
    telefono: {
      type: Sequelize.INTEGER
    },
    Id: {
      type: Sequelize.INTEGER,
      references: {
        // This is a reference to another model
        model: require("./company.model.js")(sequelize, Sequelize),

        // This is the column name of the referenced model
        key: 'id'
      }
    }
  });

  return Cliente;
};
