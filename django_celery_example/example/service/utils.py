# example/utils.py (สร้างไฟล์ใหม่หรือเขียนใน views.py ก็ได้)
def serialize_product(product):
    return {
        "id": product.id,
        "title": product.title,
        "price": float(product.price),
        "url": getattr(product, "url", None),  # ใช้ getattr เผื่อกรณี url ไม่ได้ดึงมา
        "img_url": product.img_url,
    }
