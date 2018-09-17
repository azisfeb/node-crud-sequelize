var express = require('express');
var router = express.Router();
const {signIn, signOut} = require('../controller/authController');
const {getData} = require('../controller/userArticleController')
const {isAuth} = require('../middleware/auth');
var users = require('./users');
var article = require('./article');


router.get('/login', function(req, res, next){
  res.render('login', { title: 'Login Form'})
});

router.post('/signin', signIn);
router.get('/logout', isAuth, signOut);
router.get('/', isAuth, getData);

router.use('/article', isAuth, article);
router.use('/users', isAuth, users);

module.exports = router;
