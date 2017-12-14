const chai = require('chai');
const expect = chai.expect;
const superagent = require('superagent')

var BASE_URL = 'http://localhost:3000/api';

var url = [
    "https://www.amazon.com/JBL-Pulse-Bluetooth-Waterproof-Black/dp/B074Q4S2NJ",
    "https://www.amazon.com/Philips-AVENT-Double-Electric-Comfort/dp/B00N4R4C3M",
    "https://www.amazon.com/Philips-AVENT-Single-Electric-Comfort/dp/B00PF83R6G/",
     "https://www.amazon.com/Philips-AVENT-Natural-Glass-Bottle/dp/B00PF83R84/ref=sr_1_6_s_it?s=baby-products&ie=UTF8&qid=1508883080&sr=1-6&keywords=philips+avent",
     "https://www.amazon.com/Philips-AVENT-Natural-Glass-Bottle/dp/B00PF83R0W/ref=sr_1_6_s_it?s=baby-products&ie=UTF8&qid=1508883080&sr=1-6&keywords=philips%2Bavent&th=1",
     "https://www.amazon.com/Britax-Boulevard-G4-1-Convertible-Domino/dp/B00OLRKNGY/ref=sr_1_1_s_it?s=baby-products&ie=UTF8&qid=1508884406&sr=1-1&refinements=p_89%3ABritax%2BUSA&th=1",
     "https://www.amazon.com/Bose-QuietComfort-Wireless-Headphones-Cancelling/dp/B01E3SNO1G/ref=sr_1_3?s=electronics&ie=UTF8&qid=1508884685&sr=1-3&keywords=bose",
     "https://www.amazon.com/JBL-Wireless-Bluetooth-Speaker-Pairing/dp/B00GOF0ZQ4/ref=sr_1_5?ie=UTF8&qid=1508884897&sr=8-5&keywords=jbl+pulse"
 ];

var url2 = [
    "https://www.amazon.com/God-War-3-Remastered-PlayStation-4/dp/B00USM22DI",
    "https://www.amazon.com/PlayStation-4-Pro-1TB-Console/dp/B01LOP8EZC",
    "https://www.amazon.com/PlayStation-Slim-500GB-Console-Discontinued-4/dp/B01LRLJV28",
    "https://www.amazon.com/DualShock-Wireless-Controller-PlayStation-Black-4/dp/B01LWVX2RG"
];

var c_id;

describe("test url api with superagent", () => {
    it("test GET /url/api/urls/", (done) => {
        superagent.get(BASE_URL + '/urls')
            .end(function(err, res) {
                // expect(err).to.not.exist;
                expect(res.status).to.equal(200);
                expect(res.text).to.exist;

                var urls = JSON.parse(res.text);
                expect(urls['data']).to.be.an.instanceof(Array);

                done();
            });
    });

    it("test Insert url API", (done) => {
        superagent.post(BASE_URL + '/urls/')
            .type('form')
            .send({"url":url[0]})
            .end(function(err, res) {
                // expect(err).to.not.exist;
                expect(res.status).to.equal(201);
                expect(res.text).to.exist;

                var returnUrl = JSON.parse(res.text);
                expect(returnUrl['data']).to.be.an('object').that.is.not.empty;
                expect(returnUrl['data']['c_url']).to.equal(url[0]);
                c_id = returnUrl['data']['c_id'];
                done();
            });
    });

    it("test whether url is inserted", (done) => {
        superagent.get(BASE_URL + '/urls/')
            .end(function(err, res) {
                // expect(err).to.not.exist;
                expect(res.status).to.equal(200);
                expect(res.text).to.exist;

                var urls = JSON.parse(res.text);
                expect(urls['data']).to.be.an.instanceof(Array);

                function findUrl(element) {
                        return element.c_url === url[0];
                }
                if (urls['data'].find(findUrl) === undefined) throw new Error("fail to find the inserted url");
                done();
            });
    });

    it("test update url API", (done) => {
        superagent.put(BASE_URL + '/urls/' + c_id)
            .type('form')
            .send({"url":url[1]})
            .end(function(err, res) {
                // expect(err).to.not.exist;
                expect(res.status).to.equal(200);
                expect(res.text).to.exist;

                done();
            });
    });

    it("test whether url is updated successfully", (done) => {

        superagent.get(BASE_URL + '/urls/')
            .end(function(err, res) {
                // expect(err).to.not.exist;
                expect(res.status).to.equal(200);
                expect(res.text).to.exist;

                var urls = JSON.parse(res.text);
                expect(urls['data']).to.be.an.instanceof(Array);

                function findUrl(element) {
                        return element.c_url === url[1];
                }
                if (urls['data'].find(findUrl) === undefined) throw new Error("fail to find the inserted url");
                done();
            });
    });

    it("test Delete url API", (done) => {
        superagent.delete(BASE_URL + '/urls/')
            .type('form')
            .send({"url":url[1]})
            .end(function(err, res) {
                expect(err).to.not.exist;
                expect(res.status).to.equal(204);
                expect(res.text).to.exist;

                done();
            });
    });

    it("test whether url is deleted", (done) => {
        superagent.get(BASE_URL + '/urls/')
            .end(function(err, res) {
                expect(err).to.not.exist;
                expect(res.status).to.equal(200);
                expect(res.text).to.exist;

                var urls = JSON.parse(res.text);
                expect(urls['data']).to.be.an.instanceof(Array);

                function findUrl(element) {
                        return element.c_url === url[1];
                }
                if (urls['data'].find(findUrl) !== undefined) throw new Error("the url is still in db");
                done();
            });
    });

    it("test API to insert another url ", (done) => {
        superagent.post(BASE_URL + '/urls/')
            .type('form')
            .send({"url":url[0]})
            .end(function(err, res) {
                // expect(err).to.not.exist;
                expect(res.status).to.equal(201);
                expect(res.text).to.exist;

                var returnUrl = JSON.parse(res.text);
                expect(returnUrl['data']).to.be.an('object').that.is.not.empty;
                expect(returnUrl['data']['c_url']).to.equal(url[0]);
                c_id = returnUrl['data']['c_id'];
                done();
            });
    });

    it("test API to delete another url ", (done) => {
        superagent.delete(BASE_URL + '/urls/' + c_id)
            .end(function(err, res) {
                expect(err).to.not.exist;
                expect(res.status).to.equal(204);
                expect(res.text).to.exist;

                done();
            });
    });

    it("test whether another url is deleted", (done) => {
        superagent.get(BASE_URL + '/urls/')
            .end(function(err, res) {
                expect(err).to.not.exist;
                expect(res.status).to.equal(200);
                expect(res.text).to.exist;

                var urls = JSON.parse(res.text);
                expect(urls['data']).to.be.an.instanceof(Array);

                function findUrl(element) {
                        return element.c_url === url[0];
                }
                if (urls['data'].find(findUrl) !== undefined) throw new Error("the url is still in db");
                done();
            });
    });
});
