const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv'); // 👈 add this
const cors = require('cors');

dotenv.config(); // 👈 load .env

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
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

const Beneficiary = require('./models/Beneficiary');

// POST /api/register
app.post('/api/register', async (req, res) => {
    try {
        const { name, age, gender, location, notes } = req.body;
        if (!name || !age || !gender || !location) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        const beneficiary = new Beneficiary({ name, age, gender, location, notes });
        await beneficiary.save();
        res.status(201).json({ message: 'Beneficiary registered', beneficiary });
    } catch (err) {
        res.status(500).json({ error: 'Server error', details: err.message });
    }
});

// GET /api/search
app.get('/api/search', async (req, res) => {
    try {
        const { name, minAge, maxAge, gender, location } = req.query;
        const query = {};
        if (name) query.name = { $regex: name, $options: 'i' };
        if (gender) query.gender = gender;
        if (location) query.location = { $regex: location, $options: 'i' };
        if (minAge || maxAge) {
            query.age = {};
            if (minAge) query.age.$gte = Number(minAge);
            if (maxAge) query.age.$lte = Number(maxAge);
        }
        const results = await Beneficiary.find(query).sort({ createdAt: -1 });
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: 'Server error', details: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
