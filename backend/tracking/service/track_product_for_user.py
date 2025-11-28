from ..models import Product, TrackUserItem
from django.contrib.auth.models import User

class ProductNotFoundException(Exception):
    pass

def track_product_for_user(email: str, product_id: int, target_price: float) -> TrackUserItem:
    try:
        product = Product.objects.get(id=product_id)
    except Product.DoesNotExist:
        raise ProductNotFoundException("Product not found.")

    return TrackUserItem.objects.create(
        email=email,
        product=product,
        target_price=target_price
    )
