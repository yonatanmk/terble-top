const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  bbgUsername: String,
  games: [String],
});

mongoose.model('users', userSchema);
