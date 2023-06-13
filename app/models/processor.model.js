
module.exports = (sequelize, Sequelize) => {
  const Processor = sequelize.define("processors", {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: Sequelize.INTEGER
    },

    processorName: {
      type: Sequelize.STRING
    },
  })

  return Processor;
}