from django.core.mail import send_mail
from django.conf import settings

def send_price_alert(email, product, target_price):
    subject = f"📌 คุณเริ่มติดตามสินค้า: {product.title}"
    message = (
        f"คุณได้เริ่มติดตามสินค้า '{product.title}' เรียบร้อยแล้ว\n"
        f"ราคาปัจจุบัน: {product.price} บาท\n"
        f"ราคาที่คุณต้องการให้แจ้งเตือน: {target_price} บาท\n\n"
        f"เมื่อสินค้าลดราคาถึงเป้าหมาย เราจะส่งอีเมลแจ้งให้คุณทราบทันที\n\n"
        f"🔗 ดูสินค้าได้ที่: {product.url}"
        f"เราจะแจ้งเตือนทุกวัน\n\n"

    )
    from_email = settings.EMAIL_HOST_USER
    recipient_list = [email]
    send_mail(subject, message, from_email, recipient_list)

    
def notify_price_change(email, product, old_price, new_price):
    subject = f"📉 ราคาสินค้าลดลง: {product.title}"
    message = (
        f"🎉 ราคาสินค้าที่คุณติดตามลดลงแล้ว!\n\n"
        f"ชื่อสินค้า: {product.title}\n"
        f"ราคาก่อนหน้า: £{old_price:.2f}\n"
        f"ราคาล่าสุด: £{new_price:.2f}\n\n"
        f"ดูสินค้า: {product.url}\n\n"
        f"ขอบคุณที่ใช้บริการติดตามราคาสินค้ากับเรา 🙌"
    )
    send_mail(subject, message, "noreply@yourdomain.com", [email])

    