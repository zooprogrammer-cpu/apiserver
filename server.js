const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const yaml = require('yamljs');
const { v4: uuidv4 } = require('uuid'); // Import UUID library
const swaggerDocument = yaml.load('./swagger.yaml');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// In-memory data store
let items = [];

// Routes
app.get('/items', (req, res) => {
    res.json(items);
});

app.post('/items', (req, res) => {
    const newItem = { id: uuidv4(), ...req.body }; // Use UUID for unique ID
    items.push(newItem);
    res.status(201).json(newItem);
});

app.get('/items/:id', (req, res) => {
    const item = items.find(i => i.id === req.params.id);
    if (!item) {
        return res.status(404).json({ error: 'Item not found' });
    }
    res.json(item);
});

app.put('/items/:id', (req, res) => {
    const itemIndex = items.findIndex(i => i.id === req.params.id);
    if (itemIndex === -1) {
        return res.status(404).json({ error: 'Item not found' });
    }
    const updatedItem = { id: items[itemIndex].id, ...req.body };
    items[itemIndex] = updatedItem;
    res.json(updatedItem);
});

app.delete('/items/:id', (req, res) => {
    const itemIndex = items.findIndex(i => i.id === req.params.id);
    if (itemIndex === -1) {
        return res.status(404).json({ error: 'Item not found' });
    }
    items.splice(itemIndex, 1);
    res.status(204).send();
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`API Docs available at http://localhost:${PORT}/api-docs`);
});
