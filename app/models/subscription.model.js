const Processor = require('./processor.model');

function calcularMesesDesdeFecha(fechaInicio) {
	const fechaActual = new Date();
	const fechaInicioObj = new Date(fechaInicio);

	const diferenciaEnMilisegundos = fechaActual - fechaInicioObj;
	const milisegundosEnUnMes = 1000 * 60 * 60 * 24 * 30.4375; // Aproximadamente 30.4375 días por mes

	const mesesTranscurridos = diferenciaEnMilisegundos / milisegundosEnUnMes;
	return Math.floor(mesesTranscurridos);
}

function sumarMesesAFecha(fecha, mesesASumar) {
	const fechaObj = new Date(fecha);
	const mesActual = fechaObj.getMonth();
	fechaObj.setMonth(mesActual + mesesASumar);

	// Lidiar con casos especiales si el nuevo mes supera diciembre
	if (fechaObj.getMonth() !== ((mesActual + mesesASumar) % 12)) {
		fechaObj.setDate(0); // Establecer el último día del mes previo
	}

	return fechaObj;
}

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
			},
			createdAt: {
				type: Sequelize.DATEONLY,
				allowNull: false // Establece la fecha de creación automáticamente
			},
			quotes: {
				type: Sequelize.VIRTUAL,
				get() {
					const initialDate = this.createdAt
					return calcularMesesDesdeFecha(initialDate);
				}
			},
			nextPaymentDate: {
				type: Sequelize.VIRTUAL,
				get() {
					const initialDate = this.createdAt
					fechadePago = sumarMesesAFecha(initialDate, calcularMesesDesdeFecha(initialDate))
					return fechadePago;
				}
			},
		});

	Subscription.associate = function (models) {
		Subscription.belongsTo(models.user, { foreignKey: 'id', sourceKey: 'operatorId' });
	}

	return Subscription;
};
