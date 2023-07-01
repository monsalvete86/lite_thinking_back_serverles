const config = require('../config/db.config.js');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
	host: config.HOST,
	dialect: config.dialect,
	operatorsAliases: false,

	pool: {
		max: config.pool.max,
		min: config.pool.min,
		acquire: config.pool.acquire,
		idle: config.pool.idle
	}
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.product = require("./product.model.js")(sequelize, Sequelize);
db.cliente = require("./cliente.model.js")(sequelize, Sequelize);
db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.company = require("../models/company.model.js")(sequelize, Sequelize);
db.dailyList = require("./dailyList.model.js")(sequelize, Sequelize);
db.processor = require("./processor.model.js")(sequelize, Sequelize);
db.subscription = require("./subscription.model.js")(sequelize, Sequelize);
// db.clientDailyList = require('./clientDailyList.model.js')(sequelize, Sequelize);
db.pago = require("./pago.model.js")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
	through: 'user_roles',
	foreignKey: 'roleId',
	otherKey: 'userId'
});

db.user.belongsToMany(db.role, {
	through: 'user_roles',
	foreignKey: 'userId',
	otherKey: 'roleId'
});

db.company.hasMany(db.product, {
	foreignKey: 'companyId'
});

db.product.belongsTo(db.company);

db.cliente.belongsToMany(db.user, { through: { model: db.subscription, unique: false }, foreignKey: 'clientId' });
db.user.belongsToMany(db.cliente, { through: { model: db.subscription, unique: false }, foreignKey: 'operatorId' });
db.subscription.belongsTo(db.dailyList)
db.subscription.belongsTo(db.cliente, { foreignKey: 'clientId' })
db.subscription.belongsTo(db.user, { foreignKey: 'operatorId' })
db.user.hasMany(db.dailyList)
db.dailyList.hasMany(db.subscription)
db.dailyList.belongsTo(db.user)

db.ROLES = ['user', 'admin', 'moderator'];

module.exports = db;
