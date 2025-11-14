# JWT Authentication API Guide

This Rails backend uses Devise with JWT tokens for authentication. The API returns JWT tokens in the `Authorization` header.

## Base URL
```
http://localhost:3000
```

## Endpoints

### 1. Sign Up (Register)
Create a new user account.

**Endpoint:** `POST /signup`

**Request Body:**
```json
{
  "user": {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }
}
```

**Response:**
- **Status:** 200 OK
- **Headers:** `Authorization: Bearer <JWT_TOKEN>`
- **Body:**
```json
{
  "status": {
    "code": 200,
    "message": "Signed up successfully."
  },
  "data": {
    "id": 1,
    "email": "john@example.com",
    "name": "John Doe",
    "created_at": "2025-11-14T02:55:16.343Z"
  }
}
```

### 2. Login
Authenticate an existing user.

**Endpoint:** `POST /login`

**Request Body:**
```json
{
  "user": {
    "email": "john@example.com",
    "password": "password123"
  }
}
```

**Response:**
- **Status:** 200 OK
- **Headers:** `Authorization: Bearer <JWT_TOKEN>`
- **Body:**
```json
{
  "status": {
    "code": 200,
    "message": "Logged in successfully."
  },
  "data": {
    "id": 1,
    "email": "john@example.com",
    "name": "John Doe",
    "created_at": "2025-11-14T02:55:16.343Z"
  }
}
```

### 3. Logout
Invalidate the current JWT token.

**Endpoint:** `DELETE /logout`

**Headers:**
```
Authorization: Bearer <JWT_TOKEN>
```

**Response:**
- **Status:** 200 OK
- **Body:**
```json
{
  "status": {
    "code": 200,
    "message": "Logged out successfully."
  }
}
```

## Using the JWT Token

After successful login or signup, extract the JWT token from the `Authorization` header in the response.

### Example with cURL:
```bash
# Sign up
curl -X POST http://localhost:3000/signup \
  -H 'Content-Type: application/json' \
  -d '{"user":{"name":"John Doe","email":"john@example.com","password":"password123"}}' \
  -i

# Login
curl -X POST http://localhost:3000/login \
  -H 'Content-Type: application/json' \
  -d '{"user":{"email":"john@example.com","password":"password123"}}' \
  -i

# Use the token for authenticated requests
curl -X GET http://localhost:3000/protected_resource \
  -H 'Authorization: Bearer YOUR_JWT_TOKEN_HERE'

# Logout
curl -X DELETE http://localhost:3000/logout \
  -H 'Authorization: Bearer YOUR_JWT_TOKEN_HERE'
```

### Example with JavaScript (Fetch API):
```javascript
// Sign up
const signupResponse = await fetch('http://localhost:3000/signup', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    user: {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123'
    }
  })
});

const token = signupResponse.headers.get('Authorization');
const userData = await signupResponse.json();

// Store token in localStorage
localStorage.setItem('authToken', token);

// Use token for authenticated requests
const response = await fetch('http://localhost:3000/protected_resource', {
  headers: {
    'Authorization': localStorage.getItem('authToken')
  }
});

// Logout
await fetch('http://localhost:3000/logout', {
  method: 'DELETE',
  headers: {
    'Authorization': localStorage.getItem('authToken')
  }
});

localStorage.removeItem('authToken');
```

### Example with React (using axios):
```javascript
import axios from 'axios';

// Configure axios
const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Sign up
const signup = async (name, email, password) => {
  const response = await api.post('/signup', {
    user: { name, email, password }
  });

  const token = response.headers.authorization;
  localStorage.setItem('authToken', token);

  return response.data;
};

// Login
const login = async (email, password) => {
  const response = await api.post('/login', {
    user: { email, password }
  });

  const token = response.headers.authorization;
  localStorage.setItem('authToken', token);

  return response.data;
};

// Logout
const logout = async () => {
  await api.delete('/logout', {
    headers: {
      'Authorization': localStorage.getItem('authToken')
    }
  });

  localStorage.removeItem('authToken');
};

// Authenticated request example
const getProtectedData = async () => {
  const response = await api.get('/protected_resource', {
    headers: {
      'Authorization': localStorage.getItem('authToken')
    }
  });

  return response.data;
};
```

## Protecting Routes

To protect routes in your Rails controllers, use the `authenticate_user!` before_action:

```ruby
class ProtectedController < ApplicationController
  before_action :authenticate_user!

  def index
    render json: { message: "This is protected data", user: current_user }
  end
end
```

## Token Expiration

JWT tokens expire after **24 hours** by default. After expiration, users need to login again to get a new token.

## CORS Configuration

Make sure CORS is properly configured in `config/initializers/cors.rb` to allow your frontend to access the API and read the `Authorization` header.

## Error Responses

### Invalid Credentials (Login)
```json
{
  "error": "Invalid Email or password."
}
```
Status: 401 Unauthorized

### Validation Errors (Signup)
```json
{
  "status": {
    "code": 422,
    "message": "User couldn't be created successfully. Email has already been taken"
  }
}
```
Status: 422 Unprocessable Entity

### Unauthorized Access
```json
{
  "error": "You need to sign in or sign up before continuing."
}
```
Status: 401 Unauthorized
