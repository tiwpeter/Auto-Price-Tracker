# 🛒 Track Piece — ระบบติดตามราคาสินค้า (Price Tracker)

Track Piece เป็นโปรเจกต์เว็บแอปที่ช่วยให้ผู้ใช้สามารถติดตามราคาสินค้าจากเว็บไซต์ต่าง ๆ  
โดยระบบจะทำการดึงข้อมูลราคาล่าสุด เปรียบเทียบ และแจ้งเตือนเมื่อราคาลดลง  

สร้างด้วย **Django** สำหรับฝั่ง Backend และ **React** สำหรับฝั่ง Frontend  
เพื่อให้ระบบมีความเร็วทันสมัย และจัดการข้อมูลได้อย่างมีประสิทธิภาพ

cd fontend
npm i
npm run dev

cd backend
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
