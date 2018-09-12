var express = require('express');
var router = express.Router();
var {getUsers, getUserDetail, addUsers, editUser, activate, deactivate} = require('../controller/userController')

/* GET users listing. */
router.get('/', getUsers)

router.get('/add', function(req, res, next) {
  res.render('user/add', { title: 'User Add Form'})
});
router.post('/add', addUsers)

router.get('/:id/edit', getUserDetail)
router.post('/:id/edit', editUser)

router.get('/:id/activate', activate)
router.get('/:id/deactivate', deactivate)

module.exports = router;
