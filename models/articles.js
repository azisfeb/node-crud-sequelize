'use strict';

module.exports = (sequelize, DataTypes) => {
    var Article = sequelize.define('Article', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        users_id: DataTypes.INTEGER,
        title: DataTypes.STRING,
        content: DataTypes.STRING
    },
    {
        tableName: 'articles',
        freezeTableName: true
    })

    return Article
}