'use strict';
var jwt = require('jsonwebtoken');
var CONFIG = require('../config/config')

module.exports = {
    isAuth: (req, res, next) => {
        try{
            var session = req.session
            var token = session.token
            var decoded = jwt.verify(token, CONFIG.jwt_encryption)
            req.user = decoded
            next()
        }
        catch(err){
            res.redirect('/login')
        }
    }
}