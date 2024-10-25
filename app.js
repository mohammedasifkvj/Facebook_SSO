const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');

dotenv.config();
require('./config/passport');

const authRoutes = require('./routes/authRoute');

const app = express();

// Set EJS as templating engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(express.json());
app.use(cookieParser());

app.use(passport.initialize());

mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Failed to connect to MongoDB', err);
});

app.use('/auth', authRoutes);

app.get('/', (req, res) => {
  res.render('index', { user: res.locals.user });
});

app.get('/profile', (req, res) => {
  if (!req.user) {
    return res.redirect('/');
  }
  res.render('profile', { user: req.user });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running http://127.0.0.1:${PORT}`);
});
