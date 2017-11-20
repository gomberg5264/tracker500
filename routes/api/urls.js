var express = require('express');
var router = express.Router();
var urls_models = require("../../models/urls")
var dbcfg = require('../../config/db.json');

//  query all urls
//  return value is a JSON Array or empty Array
router.get('/', function(req, res) {
    // make sure we end with a slash, so that relative links point *into* this router
    if (req.originalUrl.slice(-1) != '/') {
      console.log("Output originalUrl" + req.originalUrl);
      return res.redirect(req.originalUrl + '/');
    }
    urls_models.listAllUrls(dbcfg, function(err, results) {
        res.set({'content-type': 'application/json;charset=utf-8'});
        data = { "data": results };
        res.status(200).end(JSON.stringify(data));
    });
});

//  insert a url into db
//  return value is a JSON Object
router.post('/', function(req, res) {
    // make sure we end with a slash, so that relative links point *into* this router
    if (req.originalUrl.slice(-1) != '/') {
      console.log("Output originalUrl" + req.originalUrl);
      return res.redirect(req.originalUrl + '/');
    }
    urls_models.insertUrl(dbcfg, req.body['url'], function(err, result) {
        if (err) {
            res.status(400).end(err);
        }
        else {
            res.set({'content-type': 'application/json;charset=utf-8'});
            res.status(201).end(JSON.stringify({ "data": result }));
        }
    });
});

//  delete a url from db
//  return value is null
router.delete('/', function(req, res) {
    urls_models.deleteUrl(dbcfg, req.body['url'], function(err, result) {
        if (err) {
            res.status(400).end(err);
        }
        else {
            res.status(204).end();
        }
    });
});

module.exports = router;
