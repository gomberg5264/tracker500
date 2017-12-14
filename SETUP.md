# Setup on Ubuntu 16.04 LTS
## Step1. install Python3.6 (by source code)
### 1. install related library
```
sudo apt-get install libreadline-gplv2-dev libncursesw5-dev libssl-dev libsqlite3-dev tk-dev libgdbm-dev libc6-dev libbz2-dev
```
### 2. install Python
```
wget https://www.python.org/ftp/python/3.6.0/Python-3.6.0.tar.xz
xz -d Python-3.6.0.tar.xz
tar -xvf  Python-3.6.0.tar
cd Python-3.6.0
./configure
make
make install 
```
### 3. checking Python version
```
python3.6 --version
Python3.6.0
```
### 4. install pip3
```
sudo apt-get install python3-pip
```
### 5. install Python Libraries
```
pip3 install requests
pip3 install beautifulsoup4
pip3 install mysql-connector-python-rf
pip3 install lxml
```
## Step2. install Node.js (by apt)
### 1. install
```
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install -y nodejs
```
### 2. checking Node version
```
node --version
v8.9.3
npm --version
5.5.1
```
## Step3. install MySQL (by apt) and create database
### 1. install
```
sudo apt-get install mysql-server mysql-client
```
### 2. create user
```
CREATE DATABASE xxxx; 
CREATE USER 'xxx'@'localhost' IDENTIFIED BY 'xxx';
GRANT ALL PRIVILEGES ON xxxx.* to xxx@localhost ;
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

## Step5. setup Amazon Price Tracker
### 1. create table (run runTracker.sh)
```
cd shell
./runTracker.sh
```
### 2. install npm packages
```
cd AmazonPriceTracker
npm install
```
### 3. run node js
```
npm start
```
### 4. run node in background
```
npm install -g forever
forever start bin/www
forever list // list all node js instance
```
## Step6 run Amazon Price Tracker
go to link: http://35.194.31.135/

## Step7 setup cronjob
input 'corntab -e'
```
1 1 * * * . /etc/profile;/bin/sh /**/**/AmazonPriceTracker/shell/runTracker.sh
```
