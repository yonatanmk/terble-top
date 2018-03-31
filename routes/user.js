const mongoose = require('mongoose');
const rp = require('request-promise');
const parser = require('xml2json');

const { fetchAndSaveGames } = require('../lib/game-utils');

const User = mongoose.model('users'); // Dont import models, access them like this via mongoose

module.exports = app => {
	app.post('/api/add-bbg-username', (req, res) => {
    const { _id } = req.user;
		const { bbgUsername } = req.body;
		
    User.findByIdAndUpdate({ _id }, { bbgUsername })
			.then(() => User.findById({ _id }))
      .then(user => res.send(user))
      .catch(error => console.log(error));

		fetchAndSaveGames(bbgUsername);
	});
};
