var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:id', function(req, res, next) {
    var url_id = req.params['id'];
    res.render('commodity', { title: 'Amazon Title' + url_id });
});

module.exports = router;
