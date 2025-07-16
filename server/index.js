const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv'); // 👈 add this
dotenv.config(); // 👈 load .env

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('✅ Connected to MongoDB Atlas'))
    .catch((err) => console.error('❌ MongoDB connection error:', err));

app.get('/', (req, res) => {
    res.send('Hello from Express backend!');
});

app.get('/api/hello', async (req, res) => {
    let dbConnected = false;
    try {
        dbConnected = mongoose.connection.readyState === 1;
    } catch (e) {
        dbConnected = false;
    }
    res.json({ message: 'Hello from Express backend!', dbConnected });
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
