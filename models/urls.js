var db = require('mysql2-db');

function init(dbcfg, callback) {

    /// how to execute a single statement spanning multiple lines, then return to callback(err)
    db.stage(dbcfg).execute(`
        CREATE TABLE IF NOT EXISTS commodity_url(
        c_id MEDIUMINT AUTO_INCREMENT PRIMARY KEY,
        c_url VARCHAR(255) NOT NULL,
        UNIQUE (c_url))
        `).finale(callback);
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
        //  insert op return 1, select op return id
        if (err)
            return callback(err);
        else if (results.length != 2)
            return callback("Internal error: incorrect number of results returned", null);
        else
            return callback(err, {
                "c_id": results[1],
                "c_url": url,
                "c_title": ""
            });
    });
}

//
//  description: list all urls in DB, and order by url_id
//
function listAllUrls(dbcfg, callback) {
    /// issue a single query, then output the result to callback(err, results)
    db.stage(dbcfg).query("SELECT * FROM commodity_url ORDER BY c_id DESC").finale(callback);
}

//
//  description: delete the url with specified url
//
function deleteUrlWithURL(dbcfg, url, callback) {
    db.stage(dbcfg).execute(
        "DELETE FROM commodity_url WHERE c_url=?", [url]).finale(callback);
}

//
//  description: delete the url with specified url
//
function deleteUrlWithID(dbcfg, c_id, callback) {
    db.stage(dbcfg).execute(
        "DELETE FROM commodity_url WHERE c_id=?", [c_id]).finale(callback);
}

//
//  description: update the url with specified url_id
//
function updateUrl(dbcfg, url, c_id, callback) {
    var stage = db.stage(dbcfg);
    stage.execute("UPDATE commodity_url SET `c_url`=? WHERE `c_id`=?", [url, c_id]);
    stage.queryInt("SELECT * FROM commodity_url WHERE `c_id`=?", [c_id]);
    stage.finale((err, results) => {
        console.log(results);
        //  insert op return 1, select op return id
        if (err)
            return callback(err);
        else if (results.length != 2)
            return callback("Internal error: incorrect number of results returned", null);
        else if (results[1] === undefined) {
            return callback("Internal error: Can't find the commodity according to the c_id", null);
        }
        else {
            return callback(err, {
                "c_id": results[1],
                "c_url": url,
                "c_title": ""
            });
        }
    });
}

module.exports = {
  init: init,
  insertUrl: insertUrl,
  listAllUrls: listAllUrls,
  deleteUrlWithURL:deleteUrlWithURL,
  deleteUrlWithID:deleteUrlWithID,
  updateUrl:updateUrl
};
