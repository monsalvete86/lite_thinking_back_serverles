import sequelize, { Sequelize } from 'sequelize';
import { Component, ManyToMany } from 'typeorm';
import clienteModel from './cliente.model';
import dailyListModel from './dailyList.model';

module.exports = (sequelize,Sequelize) =>{
    const ClientDailyList = sequelize.define('client_daily_lists',{
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
          },        

    })

    clienteModel.belongsToMany(dailyListModel, { through: ClientDailyList });
    dailyListModel.belongsToMany(clienteModel, { through: ClientDailyList });

    return ClientDailyList;
}
