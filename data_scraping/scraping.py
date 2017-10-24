import requests
from time import sleep
from bs4 import BeautifulSoup
import json
import mysql.connector


#   retrieve data from URL
def retrieve(url: str):
    #   retrieves content at the specified url
    print("*", url)
    sleep(1)  # *never* web scrape faster than 1 request per second
    r = requests.get(url, verify=False)  # get the HTML; ignore SSL errors (present on this particular site)
    soup = BeautifulSoup(r.text, "lxml")  # parse the HTML
    return soup


class Commodity:
    def __init__(self, url):
        self.url = url
        self.price = 0.0
        self.title = ""

    def retrieve_info(self):
        #   get the link to related companies
        soup = retrieve(self.url)
        for price_tag in soup.find_all(id="priceblock_ourprice"):
            str_price = price_tag.text
            self.price = float(str_price[1:])

        for title_tag in soup.find_all(id="productTitle"):
            str_title = title_tag.text
            self.title = str_title.strip()

    def print_commodity(self):
        print("title : {}, price : {}, url : {}".format(self.title, self.price, self.url))


bottle_url1 = "https://www.amazon.com/Philips-AVENT-Natural-Glass-Bottle/dp/B00PF83R84/ref=sr_1_6_s_it?s=baby-products&ie=UTF8&qid=1508883080&sr=1-6&keywords=philips+avent"
glass_bottle1 = Commodity(bottle_url1)
glass_bottle1.retrieve_info()
glass_bottle1.print_commodity()

bottle_url2 = "https://www.amazon.com/Philips-AVENT-Natural-Glass-Bottle/dp/B00PF83R0W/ref=sr_1_6_s_it?s=baby-products&ie=UTF8&qid=1508883080&sr=1-6&keywords=philips%2Bavent&th=1"
glass_bottle2 = Commodity(bottle_url2)
glass_bottle2.retrieve_info()
glass_bottle2.print_commodity()