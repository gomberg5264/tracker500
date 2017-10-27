const chai = require('chai');
const expect = chai.expect;
const superagent = require('superagent')

var BASE_URL = 'http://localhost:3000/api';

var url = [
     "https://www.amazon.com/Philips-AVENT-Natural-Glass-Bottle/dp/B00PF83R84/ref=sr_1_6_s_it?s=baby-products&ie=UTF8&qid=1508883080&sr=1-6&keywords=philips+avent",
     "https://www.amazon.com/Philips-AVENT-Natural-Glass-Bottle/dp/B00PF83R0W/ref=sr_1_6_s_it?s=baby-products&ie=UTF8&qid=1508883080&sr=1-6&keywords=philips%2Bavent&th=1",
     "https://www.amazon.com/Britax-Boulevard-G4-1-Convertible-Domino/dp/B00OLRKNGY/ref=sr_1_1_s_it?s=baby-products&ie=UTF8&qid=1508884406&sr=1-1&refinements=p_89%3ABritax%2BUSA&th=1",
     "https://www.amazon.com/Bose-QuietComfort-Wireless-Headphones-Cancelling/dp/B01E3SNO1G/ref=sr_1_3?s=electronics&ie=UTF8&qid=1508884685&sr=1-3&keywords=bose",
     "https://www.amazon.com/JBL-Wireless-Bluetooth-Speaker-Pairing/dp/B00GOF0ZQ4/ref=sr_1_5?ie=UTF8&qid=1508884897&sr=8-5&keywords=jbl+pulse"
 ];

describe("test site with superagent", () => {
    it("test GET /url/api/urls", (done) => {
        superagent.get(BASE_URL + '/urls')
            .end(function(err, res) {
                expect(err).to.not.exist;
                expect(res).to.exist;
                expect(res.status).to.equal(200);
                expect(res.text).to.exist;

                var urls = JSON.parse(res.text);
                expect(urls).to.be.an.instanceof(Array);

                done();
            });
    });

    it("test Insert url API", (done) => {
        superagent.post(BASE_URL + '/urls/')
            .type('form')
            .send({"url":url[0]})
            .end(function(err, res) {

                var returnUrl = JSON.parse(res.text);
                console.log("return url = " + res.text);

                expect(err).to.not.exist;
                expect(res).to.exist;
                expect(res.status).to.equal(201);
                expect(res.text).to.exist;

                expect(returnUrl).to.be.an('object').that.is.not.empty;
                expect(returnUrl['c_url']).to.equal(url[0])
                done();
            });
    });
});
