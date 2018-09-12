var express = require('express');
var router = express.Router();
const {getArticle} = require('../controller/articleController');

router.get('/', getArticle)

module.exports = router