const Cliente = require('./cliente.model');
const DailyList = require('./dailyList.model');

module.exports = (sequelize, Sequelize) => {
	const ClientDailyList = sequelize.define(
		'client_daily_lists',
		{
			id: {
				type: Sequelize.INTEGER,
				autoIncrement: true,
				primaryKey: true
			},
		},
	);
	return ClientDailyList;
};
