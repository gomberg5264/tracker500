var express = require('express');
var router = express.Router();
var dbcfg = require('../../config/db.json');

//  query commodity by url or by url_id?
//  return value is a JSON Object
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
