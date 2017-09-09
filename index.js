const express = require('express');
const mongoose = require('mongoose');

require('./models/User');
require('./services/passport');
const keys = require('./config/keys');
const authRoutes = require('./routes/auth');


mongoose.connect(keys.mongoURI);

const app = express();

authRoutes(app);

const PORT = process.env.PORT || 5000; // lets heroku declare which port our app will use, default of 5000
app.listen(PORT);
