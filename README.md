# Rendeal Cleaning Service API

Welcome to the Rendeal Cleaning Service API documentation. This API provides various endpoints for managing cleaning services offered by Rendeal.

## Table of Contents

- [Overview](#overview)
- [Getting Started](#getting-started)
- [Configuration](#configuration)
- [Endpoints](#endpoints)
  - [/test](#test)
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

`/test`

- Method: GET
- Description: Example endpoint to test server connectivity and response.
- Request Example:

```bash
curl -X GET http://localhost:1337/test
```

- Response:

```json
{
  "message": "This is a test endpoint"
}
```

- Notes: Replace this example with your actual endpoints. Make sure to describe each endpoint with its method, parameters, and expected responses.

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

This project is licensed under the Apache License - see the LICENSE file for details.
