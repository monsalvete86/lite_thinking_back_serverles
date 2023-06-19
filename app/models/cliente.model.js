const clientDailyListModel = require('./clientDailyList.model');
const dailyListModel = require('./dailyList.model');
const Company = require('./company.model');

module.exports = (sequelize, Sequelize) => {
	const Cliente = sequelize.define('clientes', {
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
		}
	});

	// Cliente.associate = (models) => {
	// };

	return Cliente;
};
