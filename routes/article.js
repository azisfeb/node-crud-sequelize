var express = require('express');
var router = express.Router();
const {getArticle, getDetailArticle, addArticle, editArticle, destroyArticle} = require('../controller/articleController');

router.get('/', getArticle)
router.get('/add', function(req, res, next){
    res.render('article/add', { title: "Add Article" })
})
router.post('/add', addArticle)
router.get('/:id/edit', getDetailArticle)
router.post('/:id/edit', editArticle)
router.post('/:id/delete', destroyArticle)

module.exports = router