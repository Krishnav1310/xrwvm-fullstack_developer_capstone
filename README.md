# Cars Dealership - Full Stack Cloud Development Capstone Project

## Project Name: Cars Dealership Application
**Cars Dealership** is a national car retailer in the United States. This full-stack responsive web application allows users to view nationwide dealership branches, browse car models, read customer reviews with automated sentiment analysis, and submit new reviews.

## Overview
This project was developed as the Capstone Project for the **IBM Full Stack Software Developer Professional Certificate**. It implements a robust microservices architecture combining Django, Node.js/Express, MongoDB, SQLite, and Flask, with containerization and cloud deployment capabilities.

## Architecture & Technology Stack
- **Frontend**: Responsive Single Page Application (SPA) built with **React**, **HTML5**, **CSS3**, and **Bootstrap**.
- **Backend & User Management**: **Django** (Python) handling user authentication (login, logout, registration), admin dashboard, and car makes/models ORM persistence with SQLite.
- **Microservices & Database**:
  - **Dealerships & Reviews Service**: **Node.js** with **Express** and **MongoDB** for high-volume document storage of dealership locations and customer reviews.
  - **Sentiment Analysis Service**: **Flask** microservice with **NLTK Vader** providing real-time sentiment analysis for customer feedback (positive, neutral, negative).
- **DevOps & Cloud**: Containerized with **Docker**, orchestrated with **Kubernetes**, deployed via **IBM Cloud Code Engine**, and automated using **GitHub Actions CI/CD**.

## Key Features
1. **Browse Dealerships**: View all nationwide dealerships or filter dynamically by state (e.g., Kansas).
2. **Dealer Details & Reviews**: View address, city, zip, state, and customer reviews with sentiment indicator icons.
3. **User Authentication**: Secure user registration, login, and logout.
4. **Post Reviews**: Authenticated users can write and submit reviews for cars purchased at any branch.
5. **Admin Portal**: Manage car makes, car models, and dealer data through Django Admin.
6. **Sentiment Analysis**: Automatic classification of customer reviews into positive, neutral, or negative sentiment.

## Directory Structure
```
├── .github/workflows/main.yml    # CI/CD Workflow
├── server/
│   ├── database/                 # Node.js / Express microservice & MongoDB data
│   ├── djangoapp/                # Django application (models, views, routes)
│   ├── djangoproj/               # Django settings and root routing
│   ├── frontend/                 # React SPA & static HTML (About, Contact)
│   ├── manage.py                 # Django management script
│   └── requirements.txt          # Python dependencies
├── django_server                 # Terminal log of running Django server
├── loginuser                     # cURL test for user login
├── logoutuser                    # cURL test for user logout
├── getalldealers                 # cURL test for retrieving all dealerships
├── getdealersbyState             # cURL test for retrieving Kansas dealerships
├── getdealerbyid                 # cURL test for retrieving dealer by ID
├── getdealerreviews              # cURL test for retrieving dealer reviews
├── getallcarmakes                # cURL test for retrieving car makes and models
├── analyzereview                 # cURL test for sentiment analyzer microservice
├── CICD                          # GitHub Actions execution log
└── deploymentURL                 # Application deployment URL
```
