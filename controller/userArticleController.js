'use strict';
var models = require('../models');

module.exports = {
    getData: (req, res) => {
        const User = models.User
        const Article = models.Article

        Article.belongsTo(User, {foreignKey: 'users_id', targetKey: 'id'})

        Article
        .findAll({
            include: [{
                model: User
            }]
        })
        .then((article) => {
            res.render('index', { title: "Main View", data: article })
        })
        .catch((err) => {
            res.json(err)
        })
    }
}