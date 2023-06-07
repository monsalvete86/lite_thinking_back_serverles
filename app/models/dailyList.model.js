module.exports = (sequelize, Sequelize) => {
  const DailyList = sequelize.define("daily_list", {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: Sequelize.INTEGER,
    },
    createdAt: {
      type: Sequelize.STRING,
    },
    userId: {
      type: Sequelize.INTEGER,
    },
    status: {
      type: Sequelize.BOOLEAN,
      default: true,
    },
  });

  return DailyList;
};
