from commodity import Commodity
import mysql.connector
from datetime import datetime


# urls = [
#     "https://www.amazon.com/Philips-AVENT-Natural-Glass-Bottle/dp/B00PF83R84/ref=sr_1_6_s_it?s=baby-products&ie=UTF8&qid=1508883080&sr=1-6&keywords=philips+avent",
#     "https://www.amazon.com/Philips-AVENT-Natural-Glass-Bottle/dp/B00PF83R0W/ref=sr_1_6_s_it?s=baby-products&ie=UTF8&qid=1508883080&sr=1-6&keywords=philips%2Bavent&th=1",
#     "https://www.amazon.com/Britax-Boulevard-G4-1-Convertible-Domino/dp/B00OLRKNGY/ref=sr_1_1_s_it?s=baby-products&ie=UTF8&qid=1508884406&sr=1-1&refinements=p_89%3ABritax%2BUSA&th=1",
#     "https://www.amazon.com/Bose-QuietComfort-Wireless-Headphones-Cancelling/dp/B01E3SNO1G/ref=sr_1_3?s=electronics&ie=UTF8&qid=1508884685&sr=1-3&keywords=bose",
#     "https://www.amazon.com/JBL-Wireless-Bluetooth-Speaker-Pairing/dp/B00GOF0ZQ4/ref=sr_1_5?ie=UTF8&qid=1508884897&sr=8-5&keywords=jbl+pulse"
# ]

connection = mysql.connector.connect(host="localhost", port=3306, user="demo", passwd="demo", db="semdemo")
db = connection.cursor(prepared=True)

db.execute("""
        CREATE TABLE IF NOT EXISTS commodity_price_record (
            r_id MEDIUMINT AUTO_INCREMENT PRIMARY KEY,
            c_title VARCHAR(256) NOT NULL DEFAULT '',
            c_price FLOAT NOT NULL DEFAULT 0.0,
            c_id MEDIUMINT NOT NULL,
            r_date VARCHAR(256) NOT NULL DEFAULT '',
            CONSTRAINT UC_URL_Date UNIQUE (c_id,r_date)
        )""")

db.execute("""
        CREATE TABLE IF NOT EXISTS commodity_url (
            c_id MEDIUMINT AUTO_INCREMENT PRIMARY KEY,
            c_url VARCHAR(256) NOT NULL DEFAULT '',
            c_title VARCHAR(256) NOT NULL DEFAULT '',
            UNIQUE (c_url)
        )""")

commodities = []
db.execute("SELECT c_id, c_url FROM commodity_url ORDER BY c_id")
for (c_id, c_url) in db:
    commodity = Commodity(c_id, c_url.decode("UTF-8"))
    commodity.retrieve_info()
    commodity.print_commodity()
    commodities.append(commodity)

for commodity in commodities:
    db.execute("INSERT INTO commodity_price_record(c_title,c_price,c_id,r_date) VALUES(?,?,?,?) "
               "ON DUPLICATE KEY UPDATE `c_title`=?,`c_price`=?",
               [commodity.title, commodity.price, commodity.c_id, datetime.now().strftime("%Y-%m-%d"),
                commodity.title, commodity.price])
    db.execute("UPDATE commodity_url SET `c_title`=? WHERE `c_id`=?",
               [commodity.title, commodity.c_id])

connection.commit()  # required, as mysql generally doesn't autocommit
connection.close()
