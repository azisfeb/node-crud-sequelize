'use strict';

module.exports = (sequelize, DataTypes) => {
    var User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        state: DataTypes.INTEGER
    },
    {
        tableName: 'users',
        freezeTableName: true
    })

    return User
}