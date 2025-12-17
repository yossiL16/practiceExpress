// server.js
// Run: npm install express
// Then: node server.js

const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

/**
 * 1) GET with QUERY PARAMS
 *    Endpoint: GET /greet
 *    Usage:    /greet?name=David&lang=en
 */
app.get('/greet', (req, res) => {
    const { name, lang = 'en' } = req.query;

    if (!name) {
        return res.status(400).json({
            error: 'Missing query parameter: "name".',
            how_to_use: 'Send a GET request with a "name" query parameter.',
            example_url: `http://localhost:${PORT}/greet?name=David`,
            accepted_types: {
                name: 'string (required)',
                lang: 'string (optional, default: "en", options: "en" | "he" | "es")'
            },
            example_curl: `curl "http://localhost:${PORT}/greet?name=David&lang=en"`
        });
    }

    let message;
    switch (lang) {
        case 'he':
            message = `שלום, ${name}!`;
            break;
        case 'es':
            message = `¡Hola, ${name}!`;
            break;
        default:
            message = `Hello, ${name}!`;
    }

    res.json({
        input: { name, lang },
        result: message,
        info: 'This endpoint demonstrates reading data from query parameters.'
    });
});

/**
 * 2) POST with JSON BODY
 *    Endpoint: POST /math/average
 *    Usage:    JSON body: { "numbers": [1, 2, 3, 4] }
 */
app.post('/math/average', (req, res) => {
    const { numbers } = req.body;

    if (!numbers || !Array.isArray(numbers) || numbers.length === 0) {
        return res.status(400).json({
            error: 'Missing or invalid "numbers" array in JSON body.',
            how_to_use: 'Send a POST request with JSON body containing "numbers": an array of numbers.',
            expected_body_schema: {
                numbers: 'number[] (required, non-empty)'
            },
            example_body: {
                numbers: [10, 20, 30, 40]
            },
            example_curl: `curl -X POST http://localhost:${PORT}/math/average -H "Content-Type: application/json" -d '{"numbers":[10,20,30,40]}'`
        });
    }

    const numericValues = numbers.map(Number).filter((n) => !Number.isNaN(n));

    if (numericValues.length !== numbers.length) {
        return res.status(400).json({
            error: 'All elements in "numbers" must be valid numeric values.',
            received: numbers,
            example_valid_numbers: [1, 2.5, 100]
        });
    }

    const sum = numericValues.reduce((acc, n) => acc + n, 0);
    const avg = sum / numericValues.length;

    res.json({
        input: { numbers },
        result: {
            count: numericValues.length,
            sum,
            average: avg
        },
        info: 'This endpoint demonstrates reading data from the JSON body.'
    });
});

/**
 * 3) PUT with PATH PARAM
 *    Endpoint: PUT /shout/:word
 *    Usage:    /shout/hello
 */
app.put('/shout/:word', (req, res) => {
    const { word } = req.params;

    if (!word) {
        return res.status(400).json({
            error: 'Missing path parameter: "word".',
            how_to_use: 'Send a PUT request with a word in the URL path.',
            example_url: `http://localhost:${PORT}/shout/hello`,
            accepted_types: {
                word: 'string (required)'
            },
            example_curl: `curl -X PUT http://localhost:${PORT}/shout/hello`
        });
    }

    res.json({
        input: { word },
        result: {
            uppercased: word.toUpperCase(),
            length: word.length,
            is_long: word.length > 5
        },
        info: 'This endpoint demonstrates reading data from a path parameter.'
    });
});

/**
 * 4) DELETE with HEADER
 *    Endpoint: DELETE /secure/resource
 *    Usage:    Header: x-role: admin
 */
app.delete('/secure/resource', (req, res) => {
    const role = req.header('x-role');

    if (!role) {
        return res.status(400).json({
            error: 'Missing required header: "x-role".',
            how_to_use: 'Send a DELETE request with a header named "x-role".',
            expected_header: {
                'x-role': 'string (e.g. "admin", "editor", "viewer")'
            },
            example_curl: `curl -X DELETE http://localhost:${PORT}/secure/resource -H "x-role: admin"`
        });
    }

    if (role !== 'admin') {
        return res.status(403).json({
            error: 'Forbidden: only role "admin" can delete this resource.',
            your_role: role,
            allowed_roles: ['admin']
        });
    }

    res.json({
        input: { role },
        result: 'Resource deleted successfully (not really, this is just a demo).',
        info: 'This endpoint demonstrates reading data from request headers.'
    });
});

/**
 * (Optional) Catch-all for unknown routes
 */
app.all('', (req, res) => {
    res.status(404).json({
        error: 'Route not found.',
        message: 'This is a demo server. Available endpoints:',
        endpoints: [
            {
                method: 'GET',
                path: '/greet',
                usage: `/greet?name=YourName&lang=en`
            },
            {
                method: 'POST',
                path: '/math/average',
                usage: 'POST JSON: { "numbers": [1, 2, 3] }'
            },
            {
                method: 'PUT',
                path: '/shout/:word',
                usage: '/shout/hello'
            },
            {
                method: 'DELETE',
                path: '/secure/resource',
                usage: 'Header: x-role: admin'
            }
        ]
    });
});

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});
