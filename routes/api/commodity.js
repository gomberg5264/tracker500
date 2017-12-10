var express = require('express');
var router = express.Router();
var commodity_models = require("../../models/commodity")
var commodity_util = require('./commodity_util');
var moment = require('moment');
var dbcfg = require('../../config/db.json');

/**
 * query commodity prices in a time period
 * GET Method
 * @param {string} c_id
 * @param {string} start_date
 * @param {string} end_date
 * @return {object} {"title": "Bose QC35", "prices": [{"price": 300, "date": "2017-10-29"}, {...}...]}
 */
router.get('/:c_id/:start_date/:end_date', function(req, res) {

    var c_id = req.params['c_id'];
    var start_date = req.params['start_date'];
    var end_date = req.params['end_date'];

    if(moment(start_date, "YYYY-MM-DD", true).isValid()
        && moment(end_date, "YYYY-MM-DD", true).isValid()) {

        commodity_models.queryPrices(dbcfg, function(err, data) {

            if (err === null) {
                res.set({'content-type': 'application/json;charset=utf-8'});
                data = { "data": commodity_util.generateResult(data) };
                res.status(200).end(JSON.stringify(data));
            }
            else {
                res.status(400).end(err.message);
            }
        }, c_id, start_date, end_date);
    }
    else {
        res.status(400).end("Date format error");
    }

});

/**
 * query commodity prices in all time period
 * GET Method
 * @param {string} c_id
 * @return {object} {"title": "Bose QC35", "prices": [{"price": 300, "date": "2017-10-29"}, {...}...]}
 */
router.get('/:c_id', function(req, res) {

    var c_id = req.params['c_id'];

    commodity_models.queryPrices(dbcfg, function(err, data) {

        if (err === null) {
            res.set({'content-type': 'application/json;charset=utf-8'});
            data = { "data": commodity_util.generateResult(data) };
            res.status(200).end(JSON.stringify(data));
        }
        else {
            res.status(400).end(err.message);
        }

    }, c_id);
});

/**
 * query commodity prices with wrong param
 * GET Method
 * @param {string} c_id
 * @param {string} date
 * @return {object} {"title": "Bose QC35", "prices": [{"price": 300, "date": "2017-10-29"}, {...}...]}
 */
router.get('/:c_id/:date', function(req, res) {
    res.status(400).end("Missing date parameter");
});

module.exports = router;
