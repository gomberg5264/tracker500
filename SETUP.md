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
Python3.6
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
