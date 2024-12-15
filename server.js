// Import required modules
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

// Create an Express app
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Basic route
app.get('/api/greet', (req, res) => {
  res.json({ message: 'Hello, World!' });
});

// Load Swagger YAML file
const swaggerDocument = YAML.load('./swagger.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Start the server
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});
