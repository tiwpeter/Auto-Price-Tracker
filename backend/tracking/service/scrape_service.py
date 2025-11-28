from ..utils.get_html import get_html
from ..models import Product
from urllib.parse import urlparse
import re
from bs4 import BeautifulSoup

def scrape_site_books(url):
    try:
        html = get_html(url)
        soup = BeautifulSoup(html, 'html.parser')  # สร้าง soup เต็มๆ

        title_element = soup.select_one(".product_main h1")
        price_element = soup.select_one(".price_color")
        image_element = soup.select_one(".carousel-inner .item.active img")

        if not title_element or not price_element:
            return None

        title = title_element.text.strip()
        raw_price = price_element.text.strip().encode('latin1').decode('utf-8')

        match = re.match(r"([^\d.,]+)?([\d.,]+)", raw_price)
        if not match:
            return None

        currency_symbol = match.group(1) or ""
        price_text = match.group(2).replace(",", "")
        price = float(price_text)

        if image_element and image_element.has_attr('src'):
            img_url = image_element['src'].replace('../../', 'https://books.toscrape.com/')
        else:
            img_url = None

        return {
            "url": url,
            "title": title,
            "price": price,
            "currency": currency_symbol.strip(),
            "img_url": img_url
        }

    except Exception as e:
        print(f"⚠️ Error while scraping {url}: {e}")
        return None

def detect_site_from_url(url):
    domain = urlparse(url).netloc.lower()
    if "books.toscrape.com" in domain:
        return "books"
    elif "shopee.co.th" in domain:
        return "shopee"
    elif "lazada.co.th" in domain:
        return "lazada"
    return "unknown"

# 🧠 ตัว mapping site name → function
SCRAPE_FUNCTIONS = {
    "books": scrape_site_books,
    # "shopee": scrape_site_shopee,  ← ใส่ภายหลังเมื่อเขียนเสร็จ
    # "lazada": scrape_site_lazada,
}

def scrape_all_sites(urls):
    products = []

    for url in urls:
        site = detect_site_from_url(url)
        scrape_func = SCRAPE_FUNCTIONS.get(site)

        if scrape_func:
            product = scrape_func(url)
            if product:
                products.append(product)
        else:
            print(f"❌ Unsupported site for URL: {url}")

    return products
