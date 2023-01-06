const Company = require("./company.model");

module.exports = (sequelize, Sequelize) => {
  const Product = sequelize.define("products", {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: Sequelize.INTEGER
    },
    code: {
      type: Sequelize.STRING
    },
    productName: {
      type: Sequelize.STRING
    },
    stock: {
      type: Sequelize.INTEGER
    },
    companyId: {
      type: Sequelize.INTEGER,
      references: {
        // This is a reference to another model
        model: require("./company.model.js")(sequelize, Sequelize),

        // This is the column name of the referenced model
        key: 'id'
      }
    }
  });

  return Product;
};
