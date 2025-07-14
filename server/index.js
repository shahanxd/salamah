// Basic Express server setup
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello from Express backend!');
});

app.get('/api/hello', (req, res) => {
    res.json({ message: 'Hello from Express backend!' });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
