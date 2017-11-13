var express = require('express');
var router = express.Router();
var dbcfg = require('../../config/db.json');
var commodity_models = require("../../models/commodity")
var commodity_util = require('./commodity_util');

/**
 * query commodity prices in a time period
 * GET Method
 * @param {string} c_id
 * @param {string} start_date
 * @param {string} end_date
 * @return {object} {"title": "Bose QC35", "prices": [{"price": 300, "date": "2017-10-29"}, {...}...]}
 */
router.get('/:c_id/:start_date/:end_date', function(req, res) {
    // make sure we end with a slash, so that relative links point *into* this router
    if (req.originalUrl.slice(-1) != '/') {
      console.log("Output originalUrl" + req.originalUrl);
      return res.redirect(req.originalUrl + '/');
    }

    var c_id = req.params['c_id'];
    var start_date = req.params['start_date'];
    var end_date = req.params['end_date'];

    commodity_models.quertPrices(dbcfg, function(err, data) {

        if (err === undefined) {
            res.end(JSON.stringify(commodity_util.generateResult(data)));
        }
        else {
            res.status(400).end(err.message);
        }
    }, c_id, start_date, end_date);
});

/**
 * query commodity prices in all time period
 * GET Method
 * @param {string} c_id
 * @return {object} {"title": "Bose QC35", "prices": [{"price": 300, "date": "2017-10-29"}, {...}...]}
 */
router.get('/:c_id', function(req, res) {
    // make sure we end with a slash, so that relative links point *into* this router
    if (req.originalUrl.slice(-1) != '/') {
      console.log("Output originalUrl" + req.originalUrl);
      return res.redirect(req.originalUrl + '/');
    }

    var c_id = req.params['c_id'];

    commodity_models.quertPrices(dbcfg, function(err, data) {

        if (err === undefined) {
            res.end(JSON.stringify(commodity_util.generateResult(data)));
        }
        else {
            res.status(400).end(err.message);
        }

    }, c_id);
});

module.exports = router;
