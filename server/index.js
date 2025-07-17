const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv'); // 👈 add this
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
const User = require('./models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'changeme';

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

// Signup endpoint
app.post('/api/signup', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) {
      return res.status(400).json({ error: 'All fields are required.' });
    }
    if (!['General', 'NGO'].includes(role)) {
      return res.status(400).json({ error: 'Invalid role.' });
    }
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: 'Email already registered.' });
    }
    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashed, role });
    await user.save();
    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, role: user.role, name: user.name });
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({ error: 'Email, password, and role required.' });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials.' });
    }
    if (user.role !== role) {
      return res.status(400).json({ error: 'Incorrect user role selected.' });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ error: 'Invalid credentials.' });
    }
    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, role: user.role, name: user.name });
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
