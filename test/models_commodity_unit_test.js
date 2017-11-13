const expect = require('chai').expect;
var dbcfg = require('../config/db.json');
var commodity_models = require("../models/commodity")

var c_id = "29";
var start_date = "2017-11-3";
var end_date = "2017-11-10";

describe("test models of commodity", function () {

    it("should be able to list all prices with limitation of date", function (done) {
        commodity_models.quertPrices(dbcfg, (err, results) => {
            expect(err).not.to.exist;
            record_count = results.length;
            console.log("record count = " + record_count);
            done();
        }, c_id, start_date, end_date);
    });

    it("should be able to list all prices without limitation of date", function (done) {
        commodity_models.quertPrices(dbcfg, (err, results) => {
            expect(err).not.to.exist;
            record_count = results.length;
            for(var i=0; i<results.length; i++) {
                if (i+1 < results.length) {
                    console.log(results[i]['r_date']);
                    if(results[i]['r_date'] < results[i+1]['r_date'])
                        throw new Error('date should be in ascending');
                }
            }
            done();
        }, c_id);
    });

    it("should not be able to list all prices, because the wrong input of date", function (done) {
        commodity_models.quertPrices(dbcfg, (err, results) => {
            expect(err).to.exist;
            done();
        }, c_id, start_date);
    });
});
