const chai = require('chai');
const expect = chai.expect;
var commodity_util = require("../routes/api/commodity_util");

var data = [
  { r_id: 1,
    c_title: 'Bose QuietComfort 35 (Series I) Wireless Headphones, Noise Cancelling - Black',
    c_price: 329,
    r_date: '2017-10-29' },
  { r_id: 7,
    c_title: 'Bose QuietComfort 35 (Series I) Wireless Headphones, Noise Cancelling - Black',
    c_price: 329,
    r_date: '2017-10-28' },
  { r_id: 13,
    c_title: 'Bose QuietComfort 35 (Series I) Wireless Headphones, Noise Cancelling - Black',
    c_price: 329,
    r_date: '2017-10-27' },
  { r_id: 19,
    c_title: 'Bose QuietComfort 35 (Series I) Wireless Headphones, Noise Cancelling - Black',
    c_price: 329,
    r_date: '2017-10-26' },
  { r_id: 25,
    c_title: 'Bose QuietComfort 35 (Series I) Wireless Headphones, Noise Cancelling - Black',
    c_price: 329,
    r_date: '2017-10-25' }];

describe("test commodity_util.js", () => {
    it("test function getResult", (done) => {
        var result = commodity_util.generateResult(data);

        if (result['title'] !== 'Bose QuietComfort 35 (Series I) Wireless Headphones, Noise Cancelling - Black')
            throw new Error("fail to generate title");
        if (result['prices'].length !== 5)
            throw new Error("fail to generate price array");
        if (result['prices'][0]['date'] !== '2017-10-29' || result['prices'][0]['price'] !== 329)
            throw new Error("price array has data error");

        done();
    });

});
