const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const User = require('./models/User');

const app = express();
const PORT = 3000;

// 🛠 Middleware to parse JSON in POST requests
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://monang:monang@bussinesscard.tzld3ux.mongodb.net/carddb?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Setup views and static files
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// API route to get a user by ID
app.get('/api/user/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send('User not found');
    res.json(user);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Modular routes (POST /api/users and more)
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

// Fallback 404 handler
app.use((req, res) => {
  res.status(404).send('Route not found');
});

// Start server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));