const Company = require("./company.model");

module.exports = (sequelize, Sequelize) => {
  const Category = sequelize.define("categories", {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: Sequelize.INTEGER
    },
    categoryName: {
      type: Sequelize.STRING
    }
  });

  return Category;
};
