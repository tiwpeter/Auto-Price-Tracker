
from django.contrib import admin
from django.urls import path
from example import views  # ✅ เพิ่มตรงนี้


urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/products",views.api_get_products, name="api_get_products"),
    path("api/add_products_view",views.add_products_view, name="api_get_products"),
    path("api/track_product",views.track_product, name="api_get_products")

    
    #path('api/product/<int:product_id>', views.api_get_product_by_id, name='get_product_by_id'),
]
