# Setup on Ubuntu 16.04 LTS
## Step1. install Python3.6 (by source code)
### 1. install
```
wget https://www.python.org/ftp/python/3.6.0/Python-3.6.0.tar.xz
xz -d Python-3.6.0.tar.xz
tar -xvf  Python-3.6.0.tar
cd Python-3.6.0
./configure
make
make install 
```
### 2. test
```
python3.6 --version
Python3.6.0
```
## Step2. install Node.js (by apt)
### 1. install
```
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install -y nodejs
```
### 2. test
```
node --version
v8.9.3
npm --version
5.5.1
```
## Step3. install MySQL (by apt)
### 1. install
```
sudo apt-get install mysql-server mysql-client
```

## Step4. install phpMyAdmin (Optional)
### 1. install PHP7.0, Nginx
```
sudo apt-get install nginx php7.0 php7.0-fpm
```
### 2. config Nginx
modify Nginx config file /etc/nginx/sites-enabled/default
```
server {
        listen 80 default_server;
        listen [::]:80 default_server;

        root /var/www;

        # Add index.php to the list if you are using PHP
        index index.php index.html index.htm;

        server_name _;

        location / {
                # First attempt to serve request as file, then
                # as directory, then fall back to displaying a 404.
                try_files $uri $uri/ =404;
        }

        location ~ \.php$ {

                include fastcgi.conf;
                include fastcgi_params;

                fastcgi_pass unix:/run/php/php7.0-fpm.sock;
        }
}
```
### 3. test phpinfo
create file /var/www/index.php
```
<?php phpinfo(); ?>
```
go to link http://url
### 4. install phpmyadmin
```
apt-get install phpmyadmin
cp -r /usr/share/phpmyadmin /var/www
```
go to link http://url/phpmyadmin

