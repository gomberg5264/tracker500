
/**
 * generate Result object
 * @param {array} data
 * @return {object} {"title": "Bose QC35", "price_array": [{"price": 300, "date": "2017-10-29"}, {...}...]}
 */
function generateResult(data) {
    var result = {};
    if (data.length === 0) {
        result['title'] = "";
        result['price_array'] = [];
    }
    else {
        result['title'] = data[0]['c_title'];
        result['price_array'] = [];
        for(i in data) {
            var item = {};
            item['price'] = data[i]['c_price'];
            item['date'] = data[i]['r_date'];
            result['price_array'].push(item);
        }
    }
    return result;
}

module.exports = {
  generateResult: generateResult
};
