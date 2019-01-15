import requests
from time import sleep
from bs4 import BeautifulSoup
import random
import mysql.connector
from datetime import datetime


#   retrieve data from URL
def retrieve(url: str):
    #   retrieves content at the specified url
    print("*", url)
    sleep(1)  # *never* web scrape faster than 1 request per second
    UAS = ("Mozilla/5.0 (Windows NT 6.1; WOW64; rv:40.0) Gecko/20100101 Firefox/40.1",
           "Mozilla/5.0 (Windows NT 6.3; rv:36.0) Gecko/20100101 Firefox/36.0",
           "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10; rv:33.0) Gecko/20100101 Firefox/33.0",
           "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36",
           "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2227.1 Safari/537.36",
           "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2227.0 Safari/537.36",
           )
    ua = UAS[random.randrange(len(UAS))]
    headers = {'user-agent': ua, 'Cache-Control': 'no-cache'}
    r = requests.get(url, headers=headers, verify=False)  # get the HTML; ignore SSL errors (present on this particular site)
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

        # retrieve title
        for title_tag in soup.find_all(id="productTitle"):
            str_title = title_tag.text
            self.title = str_title.strip('\n').strip()

        # retrieve price
        # print(soup)

        is_used_price = False

        for price_tag in soup.find_all(id="priceblock_ourprice"):
            str_price = price_tag.text.strip(' ')
            print(str_price)
            if str_price.find('\n') == -1:
                self.price = float(str_price[1:])
            else:
                prices = str_price.split('\n')
                str_price_integer, str_price_decimal = '', ''
                for price in prices:
                    if price != '' and price != '$':
                        if str_price_integer == '':
                            str_price_integer = price
                        else:
                            str_price_decimal = price

                self.price = float(str_price_integer + '.' + str_price_decimal)

                # if str_price_integer == '\n':
                #     is_used_price = True
                #     break
                # else:
                #     self.price = float(str_price_integer + '.' + str_price_decimal)

        if len(soup.find_all(id="priceblock_ourprice")) == 0:
            for price_tag in soup.find_all(id="priceblock_dealprice"):
                str_price = price_tag.text.strip(' ')
                self.price = float(str_price[1:])

        if is_used_price:
            for price_tag in soup.find_all(id="priceblock_usedprice"):
                str_price = price_tag.text
                if str_price.find('\n') == -1:
                    self.price = float(str_price[1:])
                else:
                    index_of_1st_enter = str_price.find('\n', 2 + 1)
                    str_price_integer = str_price[2:index_of_1st_enter]
                    index_of_2nd_enter = str_price.find('\n', index_of_1st_enter + 1)
                    str_price_decimal = str_price[index_of_1st_enter + 1:index_of_2nd_enter]
                    self.price = float(str_price_integer + '.' + str_price_decimal)

        self.retrieve_count += 1

        #   if fails, retrieve again.
        if self.price == 0.0 and self.title == "" and self.retrieve_count < 3:
            self.retrieve_info()

    def print_commodity(self):
        print("title : {}, price : {}, url : {}".format(self.title, self.price, self.url))


urls = [
    # "https://www.amazon.com/PlayStation-Slim-500GB-Console-Discontinued-4/dp/B01LRLJV28",
    # "https://www.amazon.com/PlayStation-4-Pro-1TB-Console/dp/B01LOP8EZC?th=1",
    # "https://www.amazon.com/God-War-3-Remastered-PlayStation-4/dp/B00USM22DI",
    # "https://www.amazon.com/dp/B073TS5FSK/ref=dp_sp_detail?psc=1",
    # "https://www.amazon.com/dp/B00T8VQTGQ",
    # "https://www.amazon.com/Philips-AVENT-Double-Electric-Comfort/dp/B00N4R4C3M/ref=sr_1_4_s_it?s=baby-products&ie=UTF8&qid=1509343031&sr=1-4&keywords=AVENT+Double+Electric+Comfort+Breast+Pump",
    # "https://www.amazon.com/Philips-AVENT-Natural-Glass-Bottle/dp/B00PF83R84/ref=sr_1_6_s_it?s=baby-products&ie=UTF8&qid=1508883080&sr=1-6&keywords=philips+avent",
    # "https://www.amazon.com/Philips-AVENT-Natural-Glass-Bottle/dp/B00PF83R0W/ref=sr_1_6_s_it?s=baby-products&ie=UTF8&qid=1508883080&sr=1-6&keywords=philips%2Bavent&th=1",
    # "https://www.amazon.com/Britax-Boulevard-G4-1-Convertible-Domino/dp/B00OLRKNGY/ref=sr_1_1_s_it?s=baby-products&ie=UTF8&qid=1508884406&sr=1-1&refinements=p_89%3ABritax%2BUSA&th=1",
    # "https://www.amazon.com/Bose-QuietComfort-Wireless-Headphones-Cancelling/dp/B01E3SNO1G/ref=sr_1_3?s=electronics&ie=UTF8&qid=1508884685&sr=1-3&keywords=bose",
    # "https://www.amazon.com/dp/B01LWVX2RG",
    # "https://www.amazon.com/dp/B01E3SNO1G",
    # "https://www.amazon.com/dp/B00N4R4C3M",
    # "https://www.amazon.com/JBL-Wireless-Bluetooth-Speaker-Pairing/dp/B00GOF0ZQ4/ref=sr_1_5?ie=UTF8&qid=1508884897&sr=8-5&keywords=jbl+pulse",
    "https://www.amazon.com/dp/B06XCM9LJ4/ref=ods_mccc_Rdr",
    "https://www.amazon.com/dp/B0794W1SKP/ref=ods_mccc_lr",
    "https://www.amazon.com/All-new-Echo-Dot-3rd-Gen/dp/B0792K2BK6/ref=sr_1_1?ie=UTF8&qid=1547526586&sr=8-1&keywords=echo+dot",
    "https://www.amazon.com/Bose-QuietComfort-Wireless-Headphones-Cancelling/dp/B0756CYWWD/ref=dp_ob_title_ce",
    "https://www.amazon.com/dp/B078GVDB18/ref=emc_b_5_t",
    "https://www.amazon.com/dp/B00USM22DI?th=1"
]

commodity = Commodity(0, urls[0])
commodity.retrieve_info()
commodity.print_commodity()