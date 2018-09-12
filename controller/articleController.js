var models = require('../models')

module.exports = {
    getArticle: (req, res) => {
        models.Article
        .findAll()
        .then((article) => {
            res.render('article/index', { data: article })
        })
        .catch((err) => {
            req.flash('error', err)
            res.redirect('/article')
        })
    }
}