import mysql.connector
from datetime import datetime


class Commodity:
    def __init__(self, url):
        self.url = url
        self.price = 0.0
        self.title = ""
        self.retrieve_count = 0

    def print_commodity(self):
        print("title : {}, price : {}, url : {}".format(self.title, self.price, self.url))


connection = mysql.connector.connect(host="localhost", port=3306, user="demo", passwd="demo", db="semdemo")
db = connection.cursor(prepared=True)

db.execute("""
        CREATE TABLE IF NOT EXISTS commodity_price_record_fake (
            r_id MEDIUMINT AUTO_INCREMENT PRIMARY KEY,
            c_title VARCHAR(256) NOT NULL DEFAULT '',
            c_price FLOAT NOT NULL DEFAULT 0.0,
            c_url VARCHAR(256) NOT NULL DEFAULT '',
            r_date VARCHAR(256) NOT NULL DEFAULT '',
            UNIQUE INDEX UI_URL_Date (c_url,r_date)
        )""")

db.execute("""
        CREATE TABLE IF NOT EXISTS commodity_url (
            c_id MEDIUMINT AUTO_INCREMENT PRIMARY KEY,
            c_url VARCHAR(256) NOT NULL DEFAULT '',
            UNIQUE (url)
        )""")


commodities = []
db.execute("select * from commodity_url")
for (c_id, c_url) in db:
    commodity = Commodity(c_url.decode("UTF-8"))
    commodity.title = "test4"
    commodity.price = 2011.0
    commodity.print_commodity()
    commodities.append(commodity)

for commodity in commodities:
    db.execute("INSERT INTO commodity_price_record_fake(c_title,c_price,c_url,r_date) VALUES(?,?,?,?) "
               "ON DUPLICATE KEY UPDATE `c_title`=?,`c_price`=?",
               [commodity.title, commodity.price, commodity.url, datetime.now().strftime("%Y-%m-%d"),
                commodity.title, commodity.price])

connection.commit()  # required, as mysql generally doesn't autocommit
connection.close()
