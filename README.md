# Restaurant Management API

This API allows users to manage restaurants, menu items, and orders. It supports user registration, authentication, and various operations for restaurants and orders.

## Table of Contents

- [Setup Instructions](#setup-instructions)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [API Endpoints](#api-endpoints)
  - [User Management](#user-management)
  - [Restaurant Management](#restaurant-management)
  - [Menu Management](#menu-management)
  - [Order Management](#order-management)
- [Testing the API](#testing-the-api)

  ## Setup Instructions

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/repositoryname.git
    cd repositoryname
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Set up your environment variables in a `.env` file:
    ```
    JWT_SECRET=your_jwt_secret
    MONGODB_URI=your_mongodb_uri
    ```

4. Start the server:
    ```bash
    npm start
    ```

## Features

- User registration and login with JWT authentication
- Create, update, and manage restaurants
- Add, update, and manage menu items
- Place and track orders
- Update order status

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- Bcrypt for password hashing
- JSON Web Tokens (JWT) for authentication

## API Endpoints

### User Management

#### Signup
- **Endpoint:** `POST /api/register`
- **Request Body:**
    ```json
    {
      "name": "John Doe",
      "email": "john@example.com",
      "password": "securepassword"
    }
    ```
- **Response:**
    - **Success:** `200 OK`
      ```json
      {
        "message": "User registered successfully!"
      }
      ```
    - **Error:** `400 Bad Request`
      ```json
      {
        "message": "Email already registered"
      }
      ```

#### Login
- **Endpoint:** `POST /api/login`
- **Request Body:**
    ```json
    {
      "email": "john@example.com",
      "password": "securepassword"
    }
    ```
- **Response:**
    - **Success:** `200 OK`
      ```json
      {
        "message": "Login successful",
        "jwtToken": "your.jwt.token"
      }
      ```
    - **Error:** `404 Not Found`
      ```json
      {
        "message": "Invalid email"
      }
      ```

#### Update Profile
- **Endpoint:** `PUT /api/updateProfile`
- **Request Body:**
    ```json
    {
      "id": "userId",
      "name": "John Doe",
      "email": "john@example.com"
    }
    ```
- **Response:**
    - **Success:** `200 OK`
      ```json
      {
        "message": "Profile updated successfully",
        "userDetails": {
          // updated user details
        }
      }
      ```

#### Get User Details
- **Endpoint:** `GET /api/user`
- **Response:**
    - **Success:** `200 OK`
      ```json
      {
        "name": "John Doe",
        "email": "john@example.com"
      }
      ```

### Restaurant Management

#### Create a Restaurant
- **Endpoint:** `POST /api/restaurants`
- **Request Body:**
    ```json
    {
      "name": "The Great Restaurant",
      "location": "123 Food Lane"
    }
    ```
- **Response:**
    - **Success:** `201 Created`
      ```json
      {
        // restaurant details
      }
      ```

#### Update Restaurant
- **Endpoint:** `PUT /api/restaurants/:restaurantId`
- **Request Body:**
    ```json
    {
      "name": "Updated Restaurant Name",
      "location": "456 New Address"
    }
    ```
- **Response:**
    - **Success:** `200 OK`
      ```json
      {
        "message": "Restaurant Updated"
      }
      ```

### Menu Management

#### Add Items to Menu
- **Endpoint:** `POST /api/restaurants/:restaurantId/menu`
- **Request Body:**
    ```json
    {
      "items": [
        {
          "name": "Pizza",
          "description": "Cheese and tomato",
          "price": 10.99,
          "available": true,
          "category": "Main Course"
        }
      ]
    }
    ```
- **Response:**
    - **Success:** `200 OK`
      ```json
      {
        // updated restaurant details with menu items
      }
      ```

#### Update Menu Item
- **Endpoint:** `PUT /api/menu/:itemId`
- **Request Body:**
    ```json
    {
      "name": "Updated Pizza",
      "description": "New description",
      "price": 12.99,
      "available": true,
      "category": "Main Course"
    }
    ```
- **Response:**
    - **Success:** `200 OK`
      ```json
      {
        // updated menu item details
      }
      ```

### Order Management

#### Place a New Order
- **Endpoint:** `POST /api/orders`
- **Request Body:**
    ```json
    {
      "userId": "userId",
      "restaurantId": "restaurantId",
      "items": [
        {
          "itemId": "menuItemId",
          "quantity": 2
        }
      ],
      "deliveryAddress": "123 Delivery St",
      "totalCost": 25.98
    }
    ```
- **Response:**
    - **Success:** `201 Created`
      ```json
      {
        // order details
      }
      ```

#### Get Order Details
- **Endpoint:** `GET /api/orders/:orderId`
- **Response:**
    - **Success:** `200 OK`
      ```json
      {
        // order details
      }
      ```

#### Update Order Status
- **Endpoint:** `PUT /api/orders/:orderId`
- **Request Body:**
    ```json
    {
      "status": "Delivered"
    }
    ```
- **Response:**
    - **Success:** `200 OK`
      ```json
      {
        // updated order details
      }
      ```

#### Get All Orders for User
- **Endpoint:** `GET /api/orders`
- **Response:**
    - **Success:** `200 OK`
      ```json
      [
        // list of orders for the user
      ]
      ```

#### Track Order
- **Endpoint:** `GET /api/orders/track/:orderId`
- **Response:**
    - **Success:** `200 OK`
      ```json
      {
        "status": "In Progress"
      }
      ```



## Testing the API

You can use tools like Postman or Insomnia to test the API endpoints. Ensure you send the correct headers, especially the Authorization header for protected routes.

