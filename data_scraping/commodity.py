from helper import retrieve


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
            self.title = str_title.replace('\n', '').strip()

        # retrieve price
        # print(soup)

        is_used_price = False

        for price_tag in soup.find_all(id="priceblock_ourprice"):
            str_price = price_tag.text.replace(' ', '')
            if str_price.find('\n') == -1:
                self.price = float(str_price[1:])
            else:
                prices = str_price.split('\n')
                str_price_integer, str_price_decimal = '', ''
                for price in prices:
                    if price != '' and price != '$':
                        if str_price_integer == '':
                            str_price_integer = price
                        elif str_price_decimal == '':
                            str_price_decimal = price
                        else:
                            break

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
