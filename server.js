const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const User = require('./models/User');

const app = express();
const PORT = 3000;


// mongoose.connect('mongodb+srv://monang:monang@bussinesscard.tzld3ux.mongodb.net/carddb?retryWrites=true&w=majority');
mongoose.connect('mongodb+srv://monang:monang@bussinesscard.tzld3ux.mongodb.net/carddb?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/user/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send('User not found');
    res.json(user);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
