const chai = require('chai');
const expect = chai.expect;
const superagent = require('superagent')

var BASE_URL = 'http://localhost:3000/api';

var c_id = "29";
var start_date = "2017-11-03";
var end_date = "2017-11-10";
var wrong_end_date = "2017-12-1"; //  "YYYY-MM-DD"

describe("test commodity api with superagent", () => {
    it("test GET /url/api/commodity with limitation of date", (done) => {
        superagent.get(BASE_URL + '/commodity/' + c_id + '/' + start_date + "/" + end_date)
            .end(function(err, res) {

                expect(err).to.not.exist;
                expect(res).to.exist;
                expect(res.status).to.equal(200);
                expect(res.text).to.exist;

                var commodity = JSON.parse(res.text);
                expect(commodity).to.be.an.instanceof(Object);
                expect(commodity['data']['title']).to.be.a('string');
                expect(commodity['data']['prices']).to.be.an.instanceof(Array);

                done();
            });
    });

    it("test GET /url/api/commodity/ without limitation of date", (done) => {
        superagent.get(BASE_URL + '/commodity/' + c_id)
            .end(function(err, res) {

                expect(err).to.not.exist;
                expect(res).to.exist;
                expect(res.status).to.equal(200);
                expect(res.text).to.exist;

                var commodity = JSON.parse(res.text);
                expect(commodity).to.be.an.instanceof(Object);
                expect(commodity['data']['title']).to.be.a('string');
                expect(commodity['data']['prices']).to.be.an.instanceof(Array);

                done();
            });
    });

    it("test GET /url/api/commodity/ with wrong date input number ", (done) => {
        superagent.get(BASE_URL + '/commodity/' + c_id + '/' + start_date)
            .end(function(err, res) {
                expect(err).to.exist;
                expect(res).to.exist;
                expect(res.status).to.equal(400);

                done();
            });
    });

    it("test GET /url/api/commodity/ with wrong date format", (done) => {
        superagent.get(BASE_URL + '/commodity/' + c_id + '/' + start_date + '/' + wrong_end_date)
            .end(function(err, res) {

                expect(err).to.exist;
                expect(res).to.exist;
                expect(res.status).to.equal(400);

                done();
            });
    });

    it("test GET /url/api/commodity/ with wrong date format", (done) => {
        superagent.get(BASE_URL + '/commodity/' + c_id + '/' + end_date + '/' + start_date)
            .end(function(err, res) {

                expect(err).to.exist;
                expect(res).to.exist;
                expect(res.status).to.equal(400);

                done();
            });
    });
});
