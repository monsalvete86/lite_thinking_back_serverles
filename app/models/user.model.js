module.exports = (sequelize, Sequelize) => {  
  const Company = require("./company.model");


  const User = sequelize.define("users", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    username: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING,
      isEmail: true
    },
    password: {
      type: Sequelize.STRING
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

  User.associate = (models) => {
    User.hasMany(models.subscriptions, { foreignKey: 'operatorId' })
  }

  return User;
};
