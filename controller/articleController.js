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
    },

    getDetailArticle: (req, res) => {
        var id = req.params.id
        models.Article
        .findOne({
            where: {
                id: id
            }
        })
        .then((article) => {
            res.render('article/edit', { title: "Edit Article", data: article})
        })
        .catch((err) => {
            req.flash('error', '<li>'+ err +'</li>')
            res.redirect('/article')
        })
    },

    addArticle: (req, res) => {
        //to get decoded jwt user
        var user = req.user
        req.assert('title', 'Title can\'t be left blank').notEmpty()
        req.assert('title', 'Title length minimal 4 character').isLength({ min: 4 })
        req.assert('content', 'Please write the content').notEmpty()
        //gain from errors validation
        var errors = req.validationErrors()
        if(!errors){

            models.Article
            .build({
                users_id: user.id,
                title: req.body.title,
                content: req.body.content
            })
            .save()
            .then((article) => {
                if(article){
                    req.flash('success', '<li>Article add successfully</li>')
                    res.redirect('/article')
                }
            })
            .catch((err) => {
                req.flash('error', '<li>'+ err +'</li>')
                res.redirect('/article/add')
            })
        } else {
            var error_msg = ''
            errors.forEach(function(error){
                error_msg += '<li>'+ error.msg +'</li>'
            })

            req.flash('error', error_msg)
            res.redirect('/article/add')
        }
    },

    editArticle: (req, res) => {

        req.assert('title', 'Title can\'t be left blank').notEmpty()
        req.assert('title', 'Title length minimal 4 character').isLength({ min: 4 })
        req.assert('content', 'Content cannot be left blank').notEmpty()

        var errors = req.validationErrors()
        if(!errors){

            var user = req.user
            models.Article
            .update(
                {
                    users_id: user.id,
                    title: req.body.title,
                    content: req.body.content
                }, 
                {
                    where: {id:req.params.id}
                }
            )
            .then((article) => {
                req.flash('success', '<li>Update article successfully</li>')
                res.redirect('/article')
            })
            .catch((err) => {
                req.flash('error', '<li>'+err+'</li>')
                res.redirect('/article/'+req.params.id+'/edit')
            })

        } else {
            var error_msg = ''
            errors.forEach(function(error){
                error_msg += '<li>' + error.msg + '</li>'
            })
            
            req.flash('error', error_msg)
            res.redirect('/article/'+req.params.id+'/edit')
        }

    },

    destroyArticle: (req, res) => {
        
        models.Article
        .destroy({
            where: {id: req.params.id}
        })
        .then((article) => {
            req.flash('success', '<li>Deleting article successfully</li>')
            res.redirect('/article')
        })
        .catch((err) => {
            req.flash('error', err)
            res.redirect('/article')
        })
    }

}