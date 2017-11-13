var express = require('express');
var router = express.Router();
var dbcfg = require('../../config/db.json');

/**
 * query commodity prices in a time period
 * GET Method
 * @param {string} c_id
 * @param {string} start_date
 * @param {string} end_date
 * @return {object} {"title": "Bose QC35", "price_array": [{"price": 300, "date": "2017-10-29"}, {...}...]}
 */
router.get('/', function(req, res) {
    // make sure we end with a slash, so that relative links point *into* this router
    if (req.originalUrl.slice(-1) != '/') {
      console.log("Output originalUrl" + req.originalUrl);
      return res.redirect(req.originalUrl + '/');
    }
    // urls_models.listAllUrls(dbcfg, function(err, results) {
    //     res.end(JSON.stringify(results));
    // });
});

module.exports = router;
