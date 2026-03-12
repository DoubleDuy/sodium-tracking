<<<<<<< HEAD
# 1. Base Image (เปลี่ยนน้อยที่สุด)
FROM php:8.0-apache

# 2. ติดตั้ง System Dependencies และ PHP Extensions (นานๆ เปลี่ยนที)
# ยุบรวม apt-get update และ install ไว้ด้วยกันเพื่อลดจำนวน Layer
=======
# 1. Base Image
FROM php:8.0-apache

# 2. ติดตั้ง System Dependencies และ Library ที่ Composer ต้องการ (unzip, git)
>>>>>>> 6261355 (update)
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
<<<<<<< HEAD
=======
    zip \
    unzip \
    git \
>>>>>>> 6261355 (update)
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install mysqli pdo pdo_mysql gd \
    && docker-php-ext-enable mysqli \
    && rm -rf /var/lib/apt/lists/*

<<<<<<< HEAD
# 3. ตั้งค่าระบบ (นานๆ เปลี่ยนที)
RUN a2enmod rewrite \
    && echo "ServerName localhost" >> /etc/apache2/apache2.conf

# 4. กำหนดพื้นที่ทำงาน
WORKDIR /var/www/html

# 5. Copy ไฟล์โปรเจกต์ (เปลี่ยนบ่อยที่สุด - ไว้ล่างสุด)
# หมายเหตุ: ใน docker-compose คุณมีการใช้ volumes map ./backend/src ไปแล้ว 
# แต่การเขียน COPY ไว้ใน Dockerfile จะช่วยให้ Image นี้ทำงานได้ด้วยตัวเอง (Standalone)
COPY ./src /var/www/html/

# 6. ตั้งค่าสิทธิ์ (ทำหลังจาก Copy ไฟล์เสร็จ)
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html

# 7. เปิด Port
=======
# 3. ติดตั้ง Composer (ก๊อปปี้ตัวรันมาจาก Official Image)
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# 4. ตั้งค่าระบบ Apache
RUN a2enmod rewrite \
    && echo "ServerName localhost" >> /etc/apache2/apache2.conf

# 5. กำหนดพื้นที่ทำงาน
WORKDIR /var/www/html

# 6. Copy ไฟล์ composer.json เข้าไปก่อน (ถ้ามี) เพื่อลง Library
# ถ้ายังไม่มีไฟล์ในเครื่อง ให้ข้ามส่วนนี้ไปก่อนได้ แล้วค่อยรันผ่าน terminal
# COPY composer.json ./ 
# RUN composer install --no-interaction --optimize-autoloader

# 7. Copy ไฟล์โปรเจกต์ทั้งหมด
COPY ./src /var/www/html/

# 8. ตั้งค่าสิทธิ์โฟลเดอร์
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html

>>>>>>> 6261355 (update)
EXPOSE 80