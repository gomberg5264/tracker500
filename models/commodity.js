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
function quertPrices(dbcfg, callback, c_id, start_date, end_date) {

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

    var query_str = "SELECT r_id, c_title, c_price, r_date FROM commodity_price_record WHERE c_id='" + c_id + "'" + date_filter + " ORDER BY r_date";
    db.stage(dbcfg).query(query_str).finale(callback);
}


//
//  description: insert a url to DB
//  param: url is string
//  return callback(err, result), where result is an object, containing 'c_id' and 'c_url'
//
function insertUrl(dbcfg, url, callback) {
    var stage = db.stage(dbcfg);
    stage.execute(`
        INSERT INTO commodity_url(c_url) VALUES(?)
        ON DUPLICATE KEY UPDATE c_url=?
        `, [url, url]);

    stage.queryInt("select LAST_INSERT_ID()");
    stage.finale((err, results) => {
        console.log("output results :" + JSON.stringify(results));  //  insert op return 1, select op return id
        if (err)
            return callback(err);
        else if (results.length != 2)
            return callback("Internal error: incorrect number of results returned", null);
        else
            return callback(err, {
                "c_id": results[1],
                "c_url": url
        });
    });
}

//
//  description: list all urls in DB, and order by url_id
//
function listAllUrls(dbcfg, callback) {
    /// issue a single query, then output the result to callback(err, results)
    db.stage(dbcfg).query("SELECT * FROM commodity_url ORDER BY c_id").finale(callback);
}

//
//  description: delete the url with specified url
//
function deleteUrl(dbcfg, url, callback) {
    db.stage(dbcfg).execute(
        "DELETE FROM commodity_url WHERE c_url=?", [url]).finale(callback);
}

module.exports = {
  init: init,
  quertPrices: quertPrices,
  insertUrl: insertUrl,
  listAllUrls: listAllUrls,
  deleteUrl:deleteUrl
};
