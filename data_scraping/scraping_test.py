import requests
from time import sleep
from bs4 import BeautifulSoup
import mysql.connector
from datetime import datetime


#   retrieve data from URL
def retrieve(url: str):
    #   retrieves content at the specified url
    print("*", url)
    sleep(1)  # *never* web scrape faster than 1 request per second
    r = requests.get(url, verify=False)  # get the HTML; ignore SSL errors (present on this particular site)
    soup = BeautifulSoup(r.text, "lxml")  # parse the HTML
    return soup


class Commodity:
    def __init__(self, c_id, url):
        self.c_id = c_id
        self.url = url
        self.price = 0.0
        self.title = ""
        self.retrieve_count = 0

    def retrieve_info(self):
        #   get the link to related companies
        soup = retrieve(self.url)
        for price_tag in soup.find_all(id="priceblock_ourprice"):
            str_price = price_tag.text
            self.price = float(str_price[1:])

        for title_tag in soup.find_all(id="productTitle"):
            str_title = title_tag.text
            self.title = str_title.strip()

        self.retrieve_count += 1

        #   if fails, retrieve again.
        if self.price == 0.0 and self.title == "" and self.retrieve_count < 3:
            self.retrieve_info()

    def print_commodity(self):
        print("title : {}, price : {}, url : {}".format(self.title, self.price, self.url))


urls = [
    "https://www.amazon.com/dp/B073TS5FSK/ref=dp_sp_detail?psc=1",
    "https://www.amazon.com/dp/B00T8VQTGQ",
    "https://www.amazon.com/Philips-AVENT-Double-Electric-Comfort/dp/B00N4R4C3M/ref=sr_1_4_s_it?s=baby-products&ie=UTF8&qid=1509343031&sr=1-4&keywords=AVENT+Double+Electric+Comfort+Breast+Pump",
    "https://www.amazon.com/Philips-AVENT-Natural-Glass-Bottle/dp/B00PF83R84/ref=sr_1_6_s_it?s=baby-products&ie=UTF8&qid=1508883080&sr=1-6&keywords=philips+avent",
    "https://www.amazon.com/Philips-AVENT-Natural-Glass-Bottle/dp/B00PF83R0W/ref=sr_1_6_s_it?s=baby-products&ie=UTF8&qid=1508883080&sr=1-6&keywords=philips%2Bavent&th=1",
    "https://www.amazon.com/Britax-Boulevard-G4-1-Convertible-Domino/dp/B00OLRKNGY/ref=sr_1_1_s_it?s=baby-products&ie=UTF8&qid=1508884406&sr=1-1&refinements=p_89%3ABritax%2BUSA&th=1",
    "https://www.amazon.com/Bose-QuietComfort-Wireless-Headphones-Cancelling/dp/B01E3SNO1G/ref=sr_1_3?s=electronics&ie=UTF8&qid=1508884685&sr=1-3&keywords=bose",
    "https://www.amazon.com/JBL-Wireless-Bluetooth-Speaker-Pairing/dp/B00GOF0ZQ4/ref=sr_1_5?ie=UTF8&qid=1508884897&sr=8-5&keywords=jbl+pulse"
]

commodity = Commodity(0, urls[0])
commodity.retrieve_info()
commodity.print_commodity()