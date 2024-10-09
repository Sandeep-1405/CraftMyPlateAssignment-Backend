# Restaurant and Menu Management Backend

This backend system provides APIs for user registration, login, restaurant management, menu item management, and order processing. It is built with Node.js, Express, MongoDB, and JWT for authentication.

Table of Contents

Features
Technologies
Requirements
Installation
Environment Variables
Running the Project
API Endpoints
Dependencies

## Features

User Management: User signup, login, profile update, and user details.
Restaurant Management: Add, update, and manage restaurants.
Menu Management: Add, update, and manage restaurant menu items.
Order Management: Place orders, track order statuses, and view order details.
JWT Authentication: Secure APIs using JWT tokens.

## Technologies

Node.js: JavaScript runtime.
Express.js: Web framework for Node.js.
MongoDB: NoSQL database.
Mongoose: MongoDB object modeling for Node.js.
bcrypt: Password hashing.
jsonwebtoken: For JWT token generation and verification.
dotenv: For loading environment variables from a .env file.
cors: For enabling Cross-Origin Resource Sharing.

## Requirements

Before you start, make sure you have the following installed:

Node.js (v14.x or higher)
MongoDB

## Installation

Clone the repository:

git clone https://github.com/your-username/restaurant-management-backend.git
cd restaurant-management-backend

Install dependencies:

npm install

## Environment Variables:

Create a .env file in the root directory and add the following:

PORT=3000
MONGO_URI=<your-mongo-uri>
JWT_SECRET=<your-jwt-secret>
Replace <your-mongo-uri> with your MongoDB connection string and <your-jwt-secret> with your JWT secret.

Running the Project

Start the MongoDB server (if it's not running already):

npm start

The backend will be running on http://localhost:3000.

## API Endpoints

User Management

POST '/register'

Registers a new user.

Request Body:

json

{
    "name": "string",
    "email": "string",
    "password": "string"
}

POST '/login'

Logs in a user and returns a JWT token.

Request Body:

json

{
    "email": "string",
    "password": "string"
}

PUT `/profile`

Updates user profile.

Request Body:

json

{
    "id": "user_id",
    "name": "string",
    "email": "string"
}

GET `/profile`

Retrieves user details (requires authentication).

Restaurant Management

POST `/restaurants`

Creates a new restaurant.

Request Body:

json

{
    "name": "string",
    "location": "string"
}

PUT `/restaurants/{restaurantId}`

Updates restaurant details.

Request Body:

json

{
    "name": "string",
    "location": "string"
}

Menu Management

POST `/restaurants/{restaurantId}/menu`

Adds items to a restaurant's menu.

Request Body:

json

{
    "items": [
        {
            "name": "string",
            "description": "string",
            "price": "number",
            "available": true,
            "category": "string"
        }
    ]
}

PUT `/restaurants/{restaurantId}/menu/{itemId}`

Updates a specific menu item.

Request Body:

json

{
    "name": "string",
    "description": "string",
    "price": "number",
    "available": true,
    "category": "string"
}

Order Management

POST '/orders'

Places a new order.

Request Body:

json

{
    "userId": "user_id",
    "restaurantId": "restaurant_id",
    "items": [
        {
            "itemId": "item_id",
            "quantity": "number"
        }
    ],
    "deliveryAddress": "string",
    "totalCost": "number"
}

GET `/orders/{orderId}`

Retrieves order details.

PUT `/orders/{orderId}/status`

Updates order status.

Request Body:

json

{
    "status": "string"  // e.g., "Pending", "Confirmed", etc.
}

GET /orders

Retrieves all orders for the logged-in user.

GET `/orders/{orderId}/track`

Tracks the status of an order.

## Dependencies

This project uses the following dependencies:

json
{
  "bcrypt": "^5.1.1",
  "cors": "^2.8.5",
  "dotenv": "^16.4.5",
  "express": "^4.21.0",
  "jsonwebtoken": "^9.0.2",
  "mongodb": "^6.9.0",
  "mongoose": "^8.7.0",
  "nodemon": "^3.1.7"
}