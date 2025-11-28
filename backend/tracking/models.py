from django.db import models

class Product(models.Model):
    title = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    img_url = models.URLField(blank=True, null=True) 
    url = models.URLField(unique=True)  # <-- ฟิลด์นี้สำคัญ ถ้าไม่มีให้เพิ่ม
    currency = models.CharField(max_length=10, blank=True, null=True)  # เพิ่มบรรทัดนี้

    def __str__(self):
        return self.title

#####


class TrackUserItem(models.Model):
    email = models.EmailField()  # ใช้ EmailField แทน CharField เพื่อ validate email
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='tracked_by')
    target_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.email} tracking {self.product.title}"