const Processor = require('./processor.model');

module.exports = (sequelize, Sequelize) => {
	const Subscription = sequelize.define('subscriptions',
		{
			id: {
				primaryKey: true,
				autoIncrement: true,
				type: Sequelize.INTEGER
			},
			monthlyPayment: {
				type: Sequelize.FLOAT,
				allowNull: true
			},
			migratoryProcess: {
				type: Sequelize.STRING,
				allowNull: true
			},
			annualIncome: {
				type: Sequelize.STRING,
				allowNull: true
			},
			mainContributor: {
				type: Sequelize.STRING,
				allowNull: true
			},
			jobType: {
				type: Sequelize.STRING,
				allowNull: true
			},
			occupation: {
				type: Sequelize.STRING,
				allowNull: true
			},
			jointTaxes: {
				type: Sequelize.STRING,
				allowNull: true
			},
			whoClaimsTemplates: {
				type: Sequelize.STRING,
				allowNull: true
			},
			insurance: {
				type: Sequelize.STRING,
				allowNull: true
			},
			monthlyPremium: {
				type: Sequelize.INTEGER,
				allowNull: true
			},
			maximumSpend: {
				type: Sequelize.INTEGER,
				allowNull: true
			},
			annualDeductible: {
				type: Sequelize.INTEGER,
				allowNull: true
			},
			genericDrug: {
				type: Sequelize.INTEGER,
				allowNull: true
			},
			primaryDoctor: {
				type: Sequelize.INTEGER,
				allowNull: true
			},
			medicalSpecialist: {
				type: Sequelize.INTEGER,
				allowNull: true
			},
			emergencyRoom: {
				type: Sequelize.INTEGER,
				allowNull: true
			},
			subsidy: {
				type: Sequelize.INTEGER,
				allowNull: true
			},
			clientAnnotations: {
				type: Sequelize.STRING,
				allowNull: true
			},
			callcenterAnnotations: {
				type: Sequelize.STRING,
				allowNull: true
			},
			audio: {
				type: Sequelize.STRING,
				allowNull: true
			},
			state: {
				type: Sequelize.STRING,
				default: "GENERATED",
				allowNull: true
			},

			startCoverage: {
				type: Sequelize.STRING,
				allowNull: true
			},
			endCoverage: {
				type: Sequelize.STRING,
				allowNull: true
			},
			processorId: {
				type: Sequelize.INTEGER,
				allowNull: true,
				references: {
					model: require('./processor.model.js')(sequelize, Sequelize),
					key: 'id'
				}
			}
		});

	Subscription.associate = function (models) {
		Subscription.belongsTo(models.user, { foreignKey: 'id', sourceKey: 'operatorId' });
	}

	return Subscription;
};
