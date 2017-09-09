const express = require('express');

require('./services/passport')
const authRoutes = require('./routes/auth');

const app = express();

authRoutes(app);

const PORT = process.env.PORT || 5000; // lets heroku declare which port our app will use, default of 5000
app.listen(PORT);
