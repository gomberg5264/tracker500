var express = require('express');
var router = express.Router();
var urls_models = require("../../models/urls")
// var dbcfg = require('../../config/db_test.json');
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
        if (err) {
            res.status(400).end(err.message);
        }
        else {
            res.set({'content-type': 'application/json;charset=utf-8'});
            data = { "data": results };
            res.status(200).end(JSON.stringify(data));
        }
    });
});

//  insert a url into db
//  return value is a JSON Object
router.post('/', function(req, res) {

    var c_url = req.body['url'];
    if (c_url === undefined || c_url === '') {
        res.status(400).end("Invalid Parameter");
        return;
    }
    urls_models.insertUrl(dbcfg, c_url, function(err, result) {
        if (err) {
            console.log(err.message);
            res.status(400).end(err.message);
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
    urls_models.deleteUrlWithURL(dbcfg, req.body['url'], function(err, result) {
        if (err) {
            res.status(400).end(err.message);
        }
        else {
            res.status(204).end();
        }
    });
});

//  delete a url from db
//  return value is null
router.delete('/:c_id', function(req, res) {
    var c_id = parseInt(req.params['c_id']);
    urls_models.deleteUrlWithID(dbcfg, c_id, function(err, result) {
        if (err) {
            res.status(400).end(err.message);
        }
        else {
            res.status(204).end();
        }
    });
});

//  insert a url into db
//  return value is a JSON Object
router.put('/:c_id', function(req, res) {

    var c_id = parseInt(req.params['c_id']);
    var c_url = req.body['url'];
    if (c_url === undefined || c_url === '') {
        res.status(400).end("Invalid Parameter");
        return;
    }
    urls_models.updateUrl(dbcfg, c_url, c_id, function(err, result) {
        if (err) {
            res.status(400).end(err.message);
        }
        else {
            res.set({'content-type': 'application/json;charset=utf-8'});
            res.status(200).end(JSON.stringify({ "data": result }));
        }
    });
});

module.exports = router;
