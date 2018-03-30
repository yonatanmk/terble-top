const mongoose = require('mongoose');

const { Schema } = mongoose;

const gameSchema = new Schema({
  _id: { type : String , unique : true, required : true },
  name: String,
  image: String,
  maxPlayers: Number,
  minPlayers: Number,
  bestPlayers: Number,
  rating: Number,
});

mongoose.model('games', gameSchema);
