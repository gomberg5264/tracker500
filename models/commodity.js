var db = require('mysql2-db');

function init(dbcfg, callback) {

    /// how to execute a single statement spanning multiple lines, then return to callback(err)
    db.stage(dbcfg).execute(`
        CREATE TABLE IF NOT EXISTS commodity_price_record (
            r_id MEDIUMINT AUTO_INCREMENT PRIMARY KEY,
            c_title VARCHAR(256) NOT NULL DEFAULT '',
            c_price FLOAT NOT NULL DEFAULT 0.0,
            c_id MEDIUMINT NOT NULL,
            r_date VARCHAR(256) NOT NULL DEFAULT '',
            CONSTRAINT UC_URL_Date UNIQUE (c_id,r_date))
        `).finale(callback);
}

/**
 * query commodity prices in a time period
 * GET Method
 * @param {string} c_id
 * @param {string} start_date
 * @param {string} end_date
 * @return {array} [{'r_id', 'c_title', 'c_price', 'r_date}, {...}, ...]
 */
function queryPrices(dbcfg, callback, c_id, start_date, end_date) {

    if((start_date === undefined && end_date !== undefined) ||
        (start_date !== undefined && end_date === undefined)) {
        return callback('one of start_date and end_date missed', null);
    }

    if(start_date > end_date) {
        return callback('start_date is behind end_date!', null);
    }

    var date_filter = "";
    if(start_date !== undefined && end_date !== undefined) {
        date_filter = " AND r_date BETWEEN '" + start_date + "' AND '" + end_date + "'";
    }

    var query_str = "SELECT r_id, c_title, c_price, r_date FROM commodity_price_record WHERE c_id='" + c_id + "'" + date_filter + " ORDER BY r_date DESC LIMIT 30";
    db.stage(dbcfg).query(query_str).finale(callback);
}

module.exports = {
  init: init,
  queryPrices: queryPrices
};
