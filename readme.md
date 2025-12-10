# Express Demo API – Documentation

This server demonstrates how to receive data through **query parameters, request body, path parameters, and request headers**.
It also returns detailed instructions when required input is missing.

Base URL (local development):

```
http://localhost:3000
```

---

# Endpoints Overview

| Method | URL                | Input Type   | Purpose                                         |
| ------ | ------------------ | ------------ | ----------------------------------------------- |
| GET    | `/greet`           | Query params | Generate a greeting in multiple languages.      |
| POST   | `/math/average`    | JSON body    | Calculate the average of a list of numbers.     |
| PUT    | `/shout/:word`     | Path param   | Transform a word into uppercase and analyze it. |
| DELETE | `/secure/resource` | Header       | Delete a protected resource (admin-only).       |

---

# 1. GET `/greet`

### Description

Generates a greeting message. You must pass a **name** in the query string.
If no `name` is provided, the response includes a detailed explanation of expected input.

### URL

```
GET /greet?name=<string>&lang=<string optional>
```

### Parameters

| Query Param | Type   | Required | Description                                        |
| ----------- | ------ | -------- | -------------------------------------------------- |
| `name`      | string | yes      | The person to greet.                               |
| `lang`      | string | no       | Language for greeting: `en` (default), `he`, `es`. |

### Example Request

```
GET http://localhost:3000/greet?name=David&lang=he
```

### Example Response

```json
{
  "input": { "name": "David", "lang": "he" },
  "result": "שלום, David!",
  "info": "This endpoint demonstrates reading data from query parameters."
}
```

### Action

- Reads query parameters.
- Selects a greeting language.
- Returns a friendly greeting message.

---

# 2. POST `/math/average`

### Description

Computes the **average** of a list of numbers provided in the JSON body.
If the list is missing or invalid, the endpoint returns detailed instructions.

### URL

```
POST /math/average
```

### Request Body (JSON)

| Field     | Type     | Required | Description                              |
| --------- | -------- | -------- | ---------------------------------------- |
| `numbers` | number[] | yes      | A **non-empty array** of numeric values. |

### Example Request

```
POST http://localhost:3000/math/average
Content-Type: application/json

{
  "numbers": [10, 20, 30, 40]
}
```

### Example Response

```json
{
  "input": { "numbers": [10, 20, 30, 40] },
  "result": {
    "count": 4,
    "sum": 100,
    "average": 25
  },
  "info": "This endpoint demonstrates reading data from the JSON body."
}
```

### Action

- Parses the JSON body.
- Validates the numbers array.
- Computes count, sum, and average.
- Returns the computed data.

---

# 3. PUT `/shout/:word`

### Description

Receives a **word** as a path parameter and returns:

- The word in uppercase
- Its length
- Whether it's considered long (more than 5 characters)

If the word is missing, the server explains how to use the endpoint.

### URL

```
PUT /shout/:word
```

### Path Parameter

| Param  | Type   | Required | Description            |
| ------ | ------ | -------- | ---------------------- |
| `word` | string | yes      | The word to transform. |

### Example Request

```
PUT http://localhost:3000/shout/hello
```

### Example Response

```json
{
  "input": { "word": "hello" },
  "result": {
    "uppercased": "HELLO",
    "length": 5,
    "is_long": false
  },
  "info": "This endpoint demonstrates reading data from a path parameter."
}
```

### Action

- Extracts the word from the URL.
- Converts it to uppercase.
- Performs simple analysis (length, long/short).

---

# 4. DELETE `/secure/resource`

### Description

Deletes a protected resource.
Requires a special header:

```
x-role: admin
```

If the header is missing or not `"admin"`, the user gets instructions or a forbidden message.

### URL

```
DELETE /secure/resource
```

### Required Header

| Header   | Type   | Required | Description                              |
| -------- | ------ | -------- | ---------------------------------------- |
| `x-role` | string | yes      | Must be `"admin"` to authorize deletion. |

### Example Request

```
DELETE http://localhost:3000/secure/resource
x-role: admin
```

### Example Response

```json
{
  "input": { "role": "admin" },
  "result": "Resource deleted successfully (not really, this is just a demo).",
  "info": "This endpoint demonstrates reading data from request headers."
}
```

### Action

- Reads `x-role` from headers.
- Validates permission.
- Performs a simulated delete action.

---

# 5. Unknown Route (Catch-All)

If a user calls an unknown endpoint, the server returns:

- A 404 message
- A list of available routes and instructions

This helps students explore the API safely.

---

# Running the Server

### Install

```
npm install express
```

### Run

```
node server.js
```

---
