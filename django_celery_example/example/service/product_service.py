from example.models import Product

def save_new_products(scraped_products):
    added_products = []

    for product_data in scraped_products:
        if not Product.objects.filter(url=product_data["url"]).exists():
            product = Product.objects.create(
                title=product_data["title"],
                price=product_data["price"],
                currency=product_data["currency"],
                url=product_data["url"],
                img_url=product_data["img_url"]
            )
            added_products.append({
                "id": product.id,
                "title": product.title,
                "price": product.price,
                "currency": product.currency,
                "url": product.url,
                "img_url": product.img_url
            })

    return added_products
