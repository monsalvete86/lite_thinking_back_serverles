import sequelize, { Sequelize } from 'sequelize';
import { Component, ManyToMany } from 'typeorm';
import clienteModel from './cliente.model';
import dailyListModel from './dailyList.model';

module.exports = (sequelize,Sequelize) =>{
    const ClientDailyList = sequelize.define('dailyClientList',{
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


