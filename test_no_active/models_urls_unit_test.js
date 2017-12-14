const expect = require('chai').expect;
var dbcfg = require('../config/db_test.json');
var urls_models = require("../models/urls")

var url = [
     "https://www.amazon.com/Philips-AVENT-Natural-Glass-Bottle/dp/B00PF83R84/ref=sr_1_6_s_it?s=baby-products&ie=UTF8&qid=1508883080&sr=1-6&keywords=philips+avent",
     "https://www.amazon.com/Philips-AVENT-Natural-Glass-Bottle/dp/B00PF83R0W/ref=sr_1_6_s_it?s=baby-products&ie=UTF8&qid=1508883080&sr=1-6&keywords=philips%2Bavent&th=1",
     "https://www.amazon.com/Britax-Boulevard-G4-1-Convertible-Domino/dp/B00OLRKNGY/ref=sr_1_1_s_it?s=baby-products&ie=UTF8&qid=1508884406&sr=1-1&refinements=p_89%3ABritax%2BUSA&th=1",
     "https://www.amazon.com/Bose-QuietComfort-Wireless-Headphones-Cancelling/dp/B01E3SNO1G/ref=sr_1_3?s=electronics&ie=UTF8&qid=1508884685&sr=1-3&keywords=bose",
     "https://www.amazon.com/JBL-Wireless-Bluetooth-Speaker-Pairing/dp/B00GOF0ZQ4/ref=sr_1_5?ie=UTF8&qid=1508884897&sr=8-5&keywords=jbl+pulse"
 ];

 var record_count;

 var insert_c_id;
 var random_index = Math.floor(Math.random()*4);

describe("flushing test data through database", function () {

    it("should be able to create schema", function (done) {
        urls_models.init(dbcfg, (err) => {
            expect(err).not.to.exist;
            done();
        });
    });

    it("should be able to list all urls", function (done) {
        urls_models.listAllUrls(dbcfg, (err, results) => {
            expect(err).not.to.exist;
            record_count = results.length;
            done();
        });
    });

    it("should be able to insert a url", function (done) {
        urls_models.insertUrl(dbcfg, url[1], (err, result) => {
            expect(err).not.to.exist;
            if (!result) throw new Error("No item id returned");
            if (typeof(result['c_id']) != "number" || !Number.isInteger(result['c_id']))
                            throw new Error("Non-Integer returned on insertation");
            if (!(result["c_url"]===url[1])) throw new Error("it fails to insert url to db");
            insert_c_id = result['c_id'];
            done();
        });
    });

    it("should be able to list all urls and check whether the url is inserted", function (done) {
        urls_models.listAllUrls(dbcfg, (err, results) => {
            expect(err).not.to.exist;
            function findUrl(element) {
                    return element.c_url === url[1];
            }
            if (results.find(findUrl) === undefined) throw new Error("fail to find the inserted url");
            if (results.length !== record_count + 1) throw new Error("record count is not incremented by one");
            record_count = results.length;
            done();
        });
    });

    it("should be able to update an url", function (done) {
        var new_url = url[random_index];
        urls_models.updateUrl(dbcfg, new_url, insert_c_id, (err, result) => {
            expect(err).not.to.exist;
            expect(result['c_id']).to.equal(insert_c_id);
            expect(result['c_url']).to.equal(new_url);
            done();
        });
    });

    it("should be able to check the updated url is really updated", function (done) {
        var new_url = url[random_index];
        urls_models.listAllUrls(dbcfg, (err, results) => {
            expect(err).not.to.exist;
            var foundUrl = false;
            for(i in results) {
                if (results[i]['c_id'] === insert_c_id && results[i]['c_url'] === new_url) {
                    foundUrl = true;
                    break;
                }
            }
            if(!foundUrl) throw new Error("fail to found the updated url");
            done();
        });
    });

    it("should be able to delete a url", function (done) {
        urls_models.deleteUrlWithURL(dbcfg, url[random_index], (err, results) => {
            expect(err).not.to.exist;
            done();
        });
    });

    it("check whether the url is deleted", function (done) {
        urls_models.listAllUrls(dbcfg, (err, results) => {
            expect(err).not.to.exist;
            function findUrl(element) {
                    return element.c_url === url[random_index];
            }
            if (results.find(findUrl) !== undefined) throw new Error("fail to delete the updated url");
            if (results.length != record_count - 1) throw new Error("record count is not incremented by one");
            done();
        });
    });

    it("should be able to insert another url", function (done) {
        urls_models.insertUrl(dbcfg, url[1], (err, result) => {
            expect(err).not.to.exist;
            if (!result) throw new Error("No item id returned");
            if (typeof(result['c_id']) != "number" || !Number.isInteger(result['c_id']))
                            throw new Error("Non-Integer returned on insertation");
            if (!(result["c_url"]===url[1])) throw new Error("it fails to insert url to db");
            insert_c_id = result['c_id'];
            done();
        });
    });

    it("should be able to delete another url", function (done) {
        urls_models.deleteUrlWithID(dbcfg, insert_c_id, (err, results) => {
            expect(err).not.to.exist;
            done();
        });
    });

    it("check whether the second url is deleted", function (done) {
        urls_models.listAllUrls(dbcfg, (err, results) => {
            expect(err).not.to.exist;
            function findUrl(element) {
                    return element.c_url === url[1];
            }
            if (results.find(findUrl) !== undefined) throw new Error("fail to delete the updated url");
            if (results.length != record_count - 1) throw new Error("record count is not incremented by one");
            done();
        });
    });

});
