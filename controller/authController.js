'use strict';
var models = require('../models');
var bcrypt = require('bcrypt');
var jwt    = require('jsonwebtoken');
var CONFIG = require('../config/config')

module.exports = {
    signIn: (req, res, next) => {
        req.assert('username', 'Please enter your username').notEmpty()
        req.assert('password', 'Please enter your password').notEmpty()

        var errors = req.validationErrors()
        if(!errors){
            models.User
             .findOne({
                 where: {
                     username: req.body.username,
                     state: 1
                 }
             })
             .then((user) => {
                 if(user){
                    var checkLogin = bcrypt.compareSync(req.body.password, user.password)
                    var session = req.session
                    if(checkLogin){
                       session.username = user.username
                       session.password = user.password
                       session.token = jwt.sign({id: user.id, user: user.username, password: user.password}, CONFIG.jwt_encryption)
                       
                       res.redirect('/')
                    } else {
                       req.flash('error', '<li>Password not match</li>')
                       res.redirect('/login')
                    }
                 } else {
                    req.flash('error', "<li>User doesnt exist or your account in-active state</li>")
                    res.redirect('/login')
                 }
             })
             .catch((err) => {
                 console.log(err)
             })
        } else {
            var error_msg = ''
            errors.forEach(function(error){
                error_msg += '<li>' + error.msg + '</li>'
            })

            req.flash('error', error_msg)
            res.redirect('/login')
        }
    }, 
    
    signOut: (req, res) => {
        var session = req.session
        session.destroy(function(err){
            res.redirect('/login')
        })
    }
}
