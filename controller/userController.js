var models = require('../models');
var bcrypt = require('bcrypt');

module.exports = {
    getUsers: (req, res) => {
        models.User
        .findAll()
        .then((users) => {
            res.render('user/index', { data: users })
        }).catch((err) => {
            res.send(err)
        })
    },

    getUserDetail: (req, res) => {
        var id = req.params.id
        models.User
        .findOne({
            where: {
                id: id
            }
        })
        .then((user) => {
            res.render('user/edit', { title: "Edit User", data: user })
            //res.send(user)
        })
        .catch((err) => {
            res.send(err)
        })
    },

    addUsers: (req, res) => {
        req.assert('username', 'Username cannot be left blank').notEmpty()
        req.assert('password', 'Password cannot be left blank').notEmpty()
        req.assert('password', 'Password must be at least 4 character').isLength({ min: 4 })
        req.assert('passwordconf', 'Confirmation Password not match').equals(req.body.password)

        var errors = req.validationErrors()
        if(!errors){
            var hash = bcrypt.hashSync(req.body.password, 10)
            models.User
             .build({
                username: req.body.username,
                password: hash,
                state: 1
             })
             .save()
             .then((user) => {
                 if(user){
                    res.redirect('/users')
                 }
             })
             .catch((err) => {
                 req.flash('error', err)
                 res.redirect('/users/add')
             })
        } else {
            var error_msg = ''
            errors.forEach(function(error){
                error_msg += '<li>' + error.msg + '</li>'
            })
    
            req.flash('error', error_msg)
            res.redirect('/users/add')
        }
    },

    editUser: (req, res, next) => {
        req.assert('username', 'Username cannot be left blank').notEmpty()
        if(req.body.password){
            req.assert('password', 'Password cannot be left blank').notEmpty()
            req.assert('password', 'Password must be at least 4 character').isLength({ min: 4 })
        }

        var errors = req.validationErrors()
        if(!errors){
            var id = req.params.id
            if(req.body.password){
                var hash = bcrypt.hashSync(req.body.password, 10)
                models.User
                .update(
                    {
                        username: req.body.username,
                        password: hash
                    },
                    { where: { id: id } }
                )
                .then((user) =>{
                    if(user){
                        res.redirect('/users')
                    }
                })
                .catch((err) => {
                    req.flash('error', err)
                    res.redirect('/users/edit')
                })
            } else {
                models.User
                .update(
                    {username: req.body.username},
                    {where: { id: id }}
                )
                .then((user) =>{
                    if(user){
                        res.redirect('/users')
                    }
                })
                .catch((err) => {
                    req.flash('error', err)
                    res.redirect('/users/edit')
                })
            }
        } else {
            var error_msg = ''
            errors.forEach(function(error){
                error_msg += '<li>' + error.msg + '</li>'
            })
            req.flash('error', error_msg)
            res.redirect('/users/'+ req.params.id +'/edit')
        }
    }
}