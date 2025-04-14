const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  title: String,
  phone: String,
  email: String,
  website: String,
  location: String,
  businessname:String,
  about: String,
  profileImage: String,
  businessImage: String
});

module.exports = mongoose.model('User', UserSchema);