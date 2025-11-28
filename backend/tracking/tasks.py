from celery import shared_task
from .models import TrackUserItem
from django.core.mail import send_mail
from django.conf import settings
import time

@shared_task
def count_numbers():
    total = 0
    for i in range(1, 11):
        total += i
        print(f"กำลังนับ: {i}, รวมตอนนี้: {total}")
        time.sleep(1)  # หน่วงเวลา 1 วินาทีเพื่อเห็นผลชัด
    return total