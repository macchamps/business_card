const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const User = require('../models/User');

// ✅ Configure Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images/'); // You must create this folder
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});

// 📦 Init multer
const upload = multer({ storage });

// 🔄 Accept multiple named image fields
const cpUpload = upload.fields([
  { name: 'profileImage', maxCount: 1 },
  { name: 'businessImage', maxCount: 1 }
]);

// 🔹 Insert new user (POST)
router.post('/', cpUpload, async (req, res) => {
  try {
    const files = req.files;
    const profileImage = files?.profileImage?.[0]?.filename;
    const businessImage = files?.businessImage?.[0]?.filename;
    

    const userData = {
      name: req.body.name,
      title: req.body.title,
      phone: req.body.phone,
      email: req.body.email,
      website: req.body.website,
      location: req.body.location,
      about: req.body.about,
      profileImage: profileImage ? '/images/' + profileImage : undefined,
      businessImage: businessImage ? '/images/' + businessImage : undefined
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