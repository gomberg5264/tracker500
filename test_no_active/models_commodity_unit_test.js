const expect = require('chai').expect;
var dbcfg = require('../config/db.json');
var commodity_models = require("../models/commodity")

var c_id = "29";
var start_date = "2017-11-03";
var end_date = "2017-11-11";

describe("test models of commodity", function () {

    it("should be able to create schema", function (done) {
        commodity_models.init(dbcfg, (err) => {
            expect(err).not.to.exist;
            done();
        });
    });

    it("should be able to list all prices with limitation of date", function (done) {
        commodity_models.queryPrices(dbcfg, (err, results) => {
            expect(err).not.to.exist;

            expect(results.length).not.to.equal(0);
            for(var i=0; i<results.length; i++) {

                //  date should be in date period
                if (results[i]['r_date'] > end_date || results[i]['r_date'] < start_date)
                    throw new Error('date should be in date period');
                //  date should be in ascending
                if (i+1 < results.length) {
                    if(results[i]['r_date'] >= results[i+1]['r_date'])
                        throw new Error('date should be in ascending');
                }
            }
            done();
        }, c_id, start_date, end_date);
    });

    it("should be able to list all prices without limitation of date", function (done) {
        commodity_models.queryPrices(dbcfg, (err, results) => {
            expect(err).not.to.exist;
            for(var i=0; i<results.length; i++) {
                if (i+1 < results.length) {
                    if(results[i]['r_date'] >= results[i+1]['r_date'])
                        throw new Error('date should be in ascending');
                }
            }
            done();
        }, c_id);
    });

    it("should not be able to list all prices, because one of start or end date is missed", function (done) {
        commodity_models.queryPrices(dbcfg, (err, results) => {
            expect(err).to.exist;
            done();
        }, c_id, start_date);
    });

    it("should not be able to list all prices, because end_date is behind start_date", function (done) {
        commodity_models.queryPrices(dbcfg, (err, results) => {
            expect(err).to.exist;
            done();
        }, c_id, end_date, start_date);
    });
});
