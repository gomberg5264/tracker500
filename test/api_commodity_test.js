const chai = require('chai');
const expect = chai.expect;
const superagent = require('superagent')

var BASE_URL = 'http://localhost:3000/api';

var c_id = "29";
var start_date = "2017-11-3";
var end_date = "2017-11-10";

describe("test site with superagent", () => {
    it("test GET /url/api/commodity/", (done) => {
        superagent.get(BASE_URL + '/commodity?c_id=' + c_id + '&start_date=' + start_date + "&end_date=" + end_date)
            .end(function(err, res) {

                // expect(err).to.not.exist;
                expect(res).to.exist;
                expect(res.status).to.equal(200);
                expect(res.text).to.exist;

                var commodity = JSON.parse(res.text);
                expect(commodity).to.be.an.instanceof(Object);
                expect(commodity['title']).to.be.a('string');
                expect(commodity['price_array']).to.be.an.instanceof(Array);

                done();
            });
    });

});
