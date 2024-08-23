# Rendeal Cleaning Service API

Welcome to the Rendeal Cleaning Service API documentation. This API provides various endpoints for managing cleaning services offered by Rendeal.

## Table of Contents

- [Overview](#overview)
- [Getting Started](#getting-started)
- [Configuration](#configuration)
- [Endpoints](#endpoints)
  - [/admin/login](#adminlogin)
  - [/admin/create](#admincreate)
  - [/admin/me](#adminme)
- [Error Handling](#error-handling)
- [Contributing](#contributing)
- [License](#license)

## Overview

The Rendeal Cleaning Service API allows you to manage cleaning services, handle user authentication, and interact with our database. This document provides all the necessary information to interact with the API effectively.

## Getting Started

### Prerequisites

- **Bun** (version 1.1 or higher)
- **PostgreSQL** - For database management
- **Redis** - For caching and session management

### Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/carfdev/api-rendeal.git
   cd api-rendeal
   ```

2. **Install Dependencies:**

   ```bash
   bun install
   ```

3. **Set Up Environment Variables:**

   ```plaintext
   DATABASE_URL=your_postgres_database_url
   REDIS_URL=your_redis_url
   PORT=1337
   JWT_SECRET=your_jwt_secret
   ```

4. **Start the Server:**

   ```bash
   bun dev
   ```

The server will be running at http://localhost:1337 by default.

### Configuration

- DATABASE_URL: The URL of your PostgreSQL database.
- REDIS_URL: The URL of your Redis instance.
- PORT: The port number where the server will listen for requests.
- JWT_SECRET: The secret key used for signing JWT tokens.

## Endpoints

### `/admin/login`

- Method: POST
- Description: Administrator Authentication. This endpoint allows administrators to log in to the system, providing a valid access token to perform administrative operations.
- Request Example:

  - endpoint:

    ```bash
    POST http://localhost:1337/v1/admin/login
    ```

  - body:

    ```json
    {
      "email": "admin1@example.com",
      "password": "Password"
    }
    ```

- Response:

  ```json
  {
    "status": "success",
    "token": "token",
    "message": "Login successful"
  }
  ```

  ### `/admin/create`

- Method: POST
- Description: Create a new admin user. This endpoint allows the creation of a new administrator in the system. It requires a valid JWT token in the Authorization header and the email and password for the new admin in the request body.
- Request Example:

  - endpoint:

    ```bash
    POST http://localhost:1337/v1/admin/create
    ```

  - Headers:

    ```plaintext
    Authorization: Bearer <your-jwt-token>
    ```

  - body:

    ```json
    {
      "email": "admin1@example.com",
      "password": "Password"
    }
    ```

- Response:

  ```json
  {
    "status": "success",
    "message": "Admin created successfully"
  }
  ```

### `admin/me`

- Method: GET
- Description: Retrieve the current administrator's information. This endpoint returns the details of the admin who is currently authenticated based on the provided JWT token.
- Request Example:

  - endpoint:

    ```bash
    GET http://localhost:1337/v1/admin/me
    ```

  - Headers:

    ```plaintext
    Authorization: Bearer <your-jwt-token>
    ```

- Response:

  ```json
  {
    "status": "success",
    "data": {
      "id": "admin-id",
      "email": "admin@example.com",
      "rol": "admin"
    }
  }
  ```

## Error Handling

Errors are handled with HTTP status codes and detailed messages. Common errors include:

- `400 Bad Request`: The request was invalid or cannot be processed.
- `401 Unauthorized`: Authentication failed or is missing.
- `404 Not Found`: The requested resource was not found.
- `500 Internal Server Error`: An unexpected error occurred on the server.

## Contributing

We welcome contributions to the Rendeal Cleaning Service API. Please follow these steps:

1. Fork the repository.
2. Create a new branch (git checkout -b feature/your-feature).
3. Make your changes and commit them (git commit -am 'Add new feature').
4. Push to the branch (git push origin feature/your-feature).
5. Create a new Pull Request.

## License

This project is licensed under the Apache License - see the [LICENSE](./LICENSE) file for details.
