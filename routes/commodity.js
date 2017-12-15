var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:id', function(req, res, next) {
    var commodity_id = req.params['id'];
    res.render('commodity', { 'title': 'Amazon Title' + commodity_id, 'id': commodity_id});
});

module.exports = router;
