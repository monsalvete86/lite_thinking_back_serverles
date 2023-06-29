module.exports = (sequelize, Sequelize) => {
  const DailyList = sequelize.define("daily_lists", {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: Sequelize.INTEGER,
    },
    userId: {
      type: Sequelize.INTEGER,
    },
    status: {
      type: Sequelize.BOOLEAN,
      default: true,
    },
    date: {
      type: Sequelize.STRING,
      default: null
    },
    deletedAt: {
      type: Sequelize.DATE,
      allowNull: true,
      defaultValue: null
    }
  },
    {
      paranoid: true
    });

  return DailyList;
};
