# How to Clone and Setup the Project from GitHub

This section explains the steps for a new developer who wants to run the Peers project from GitHub.

## 1. Clone the repository

git clone https://github.com/sertifisering/Peers.git

# Frontend Setup Guide (React + typescript)

This guide explains how to create and activate a react project and run development client.

## 1. Node.js

This project requires: Node.js 18.x or higher, npm 9.x or higher
Check versions:
node -v
npm -v

### If outdated, download from:

https://nodejs.org/

## 2. Frontend Directory

All frontend files are located in:
PeersPrototype/client/

## 3. Install Required Libraries

Install project dependencies:
npm install

## This will install everything in:

PeersPrototype/client/package.json

## 4. Run the Development Server

Start the React development server:
npm run dev

### The frontend will run at:

http://localhost:5173/

# Backend Setup Guide (Django)

This guide explains how to create and activate a Python virtual environment and run the Django backend server.

## 1. Python Version

This project uses Python 3.11.x.
Make sure Python 3.11 is installed on your system.

### Check version:

Windows: python --version
Mac/Linux: python3 --version

## 2. Backend Directory

All backend files are located in:
PeersPrototype/server/
Move into this directory:
cd PeersPrototype/server/

## 3. Virtual Environment Setup

Create the virtual environment

### Windows:

python -m venv venv

### Mac/Linux:

python3 -m venv venv

## Activate the virtual environment

### Windows PowerShell:

.\venv\Scripts\activate

### Windows CMD:

venv\Scripts\activate.bat

### Mac/Linux:

source venv/bin/activate

## Check activation

You should see the prefix:
(venv)

## 4. Install Required Libraries

### Windows:

pip install -r requirements.txt

### Mac/Linux:

pip3 install -r requirements.txt

### The file is located at:

PeersPrototype/server/requirements.txt

## 5. Run the Django Server

### Windows:

python manage.py runserver

### Mac/Linux:

python3 manage.py runserver

### The server will run at:

http://127.0.0.1:8000/

## 6. Deactivate Virtual Environment

### Windows:

deactivate

### Mac/Linux:

deactivate
