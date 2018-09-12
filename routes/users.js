var express = require('express');
var router = express.Router();
var {getUsers, getUserDetail, addUsers, editUser} = require('../controller/userController')

/* GET users listing. */
router.get('/', getUsers)

router.get('/add', function(req, res, next) {
  res.render('user/add', { title: 'User Add Form'})
});
router.post('/add', addUsers)

router.get('/:id/edit', getUserDetail)
router.post('/:id/edit', editUser)

module.exports = router;
