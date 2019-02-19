from commodity import Commodity


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
    "https://www.amazon.com/dp/B00ZY1J5J2",
    "https://www.amazon.com/dp/B01LWVX2RG",
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