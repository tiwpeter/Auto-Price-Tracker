# example/views.py
from example.models import Product
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from .service.utils import serialize_product
from .service.product_service import save_new_products
from .service.scrape_service import scrape_all_sites 
from django.views.decorators.csrf import csrf_exempt
import json
from .service.track_product_for_user import track_product_for_user, ProductNotFoundException
from django.contrib.auth.decorators import login_required
from .utils.alerts import send_price_alert

@csrf_exempt
def add_products_view(request):
    if request.method == "POST":
        data = json.loads(request.body)
        urls = data.get("urls")

        print("Received URLs:", urls)
        scraped_products = scrape_all_sites(urls)
        added_products = save_new_products(scraped_products)

        return JsonResponse({"added": added_products}, safe=False)
    else:
        return JsonResponse({"error": "Only POST allowed"}, status=405)



# TrackedItem = ผู้ใช้ติดตามสินค้าชิ้นไหน พร้อมราคาที่อยากได้
## subclie ## ผู้ใช้กำหนดราคาเป้าหมาย (Target Price)

@csrf_exempt
def track_product(request):
    if request.method == "POST":
        data = json.loads(request.body)
        product_id = data.get("product_id")
        target_price = data.get("target_price")
        email = data.get("email")  # ✅ ดึง email จาก body

        try:
            track_item = track_product_for_user(
                email=email,
                product_id=product_id,
                target_price=target_price
            )
             # ✅ เรียกใช้ฟังก์ชันแจ้งเตือนทาง email
            send_price_alert(email, track_item.product, track_item.target_price)

            return JsonResponse({
                "message": "Product is now being tracked.",
                "track_id": track_item.id
            })

        except ProductNotFoundException:
            return JsonResponse({"error": "Product not found."}, status=404)

    return JsonResponse({"error": "Invalid request method."}, status=400)




## API views for Product
def api_get_products(request):
    if request.method == "GET":
        products = Product.objects.all()
        product_list = [serialize_product(p) for p in products]
        return JsonResponse(product_list, safe=False)
    return JsonResponse({"error": "Method not allowed"}, status=405)

def api_get_product_by_id(request, product_id):
    if request.method == "GET":
        product = get_object_or_404(Product, id=product_id)
        return JsonResponse(serialize_product(product))
    return JsonResponse({"error": "Method not allowed"}, status=405)
