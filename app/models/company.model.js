module.exports = (sequelize, Sequelize) => {
  const Company = sequelize.define("companies", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nameCompany: {
      type: Sequelize.STRING
    },
    direction: {
      type: Sequelize.STRING
    },
    nit: {
      type: Sequelize.STRING
    },
    telephone: {
      type: Sequelize.STRING
    }
  });

  return Company;
};
