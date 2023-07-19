module.exports = (sequelize, Sequelize) => {
  const Company = require("./company.model");

  var bcrypt = require("bcryptjs");

  const User = sequelize.define("users", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    username: {
      type: Sequelize.STRING
    },
    name: {
      type: Sequelize.STRING,
      allowNull: true
    },
    last_name: {
      type: Sequelize.STRING,
      allowNull: true
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
  },
    {
      hooks: {
        beforeCreate: async (user) => {
          if (user.password) {
            // const salt = await bcrypt.genSaltSync(8, 'a');
            user.password = bcrypt.hashSync(user.password, 8);
          }
        },
        beforeUpdate: async (user) => {
          if (user.password) {
            user.password = bcrypt.hashSync(user.password, 8);
          }
        }
      },
      instanceMethods: {
        validPassword: (password) => {
          return bcrypt.compareSync(password, this.password);
        }
      }
    });

  User.prototype.validPassword = async (password, hash) => {
    return await bcrypt.compareSync(password, hash);
  }

  User.associate = (models) => {
    User.hasMany(models.subscriptions, { foreignKey: 'operatorId' })
  }

  return User;
};
