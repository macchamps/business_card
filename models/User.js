const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  title: String,
  phone: String,
  email: String,
  profileImage: String,
  website: String,
  location: String,
  about: String
});

module.exports = mongoose.model('User', UserSchema);
