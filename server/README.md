# Backend Setup Guide (Django)
This guide explains how to create and activate a Python virtual environment and run the Django backend server.

## 1. Python Version
This project uses Python 3.11.x.
Make sure Python 3.11 is installed on your system.

## 2. Backend Directory
All backend files are located in:
Peers/server/
Move into this directory before running commands.
cd Peers/server/

## 3. Virtual Environment Setup
### Create the virtual environment
python -m venv venv

### Activate (Windows PowerShell)
.\venv\Scripts\activate

### Activate (Windows CMD)
venv\Scripts\activate.bat

### Check activation
You should see the prefix:
(venv) C:\...\>

## 4. Install Required Libraries
pip install -r requirements.txt

### The file is located at:
Peers/server/requirements.txt

## 5. Run the Django Server
python manage.py runserver

### The server will run at:
http://127.0.0.1:8000/

## 6. Deactivate Virtual Environment
deactivate