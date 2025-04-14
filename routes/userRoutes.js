const express = require('express');
const path = require('path');
const router = express.Router();
const User = require('../models/User');


// 🔹 Insert new user (POST)
router.post('/', async (req, res) => {
  try {

    const userData = {
      name: req.body.name,
      title: req.body.title,
      phone: req.body.phone,
      email: req.body.email,
      website: req.body.website,
      location: req.body.location,
      about: req.body.about,
      profileImage: req.body.profileImageUrl,
      businessImage: req.body.businessImageUrl
    };

    const newUser = new User(userData);
    const savedUser = await newUser.save();

    console.log('✅ User saved:', savedUser);
    res.status(201).json(savedUser);
  } catch (err) {
    console.error('❌ Error saving user:', err);
    res.status(400).json({ error: 'Invalid data', details: err.message });
  }
});

// 🔹 Get all users (GET)
router.get('/', async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// 🔹 Get single user by ID (GET)
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;