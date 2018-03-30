const mongoose = require('mongoose');
const rp = require('request-promise');
const parser = require('xml2json');

const { saveGameFromBBG } = require('../lib/game-utils');

const User = mongoose.model('users'); // Dont import models, access them like this via mongoose

module.exports = app => {
	app.post('/api/add-bbg-username', (req, res) => {
    const { _id } = req.user;
    User.findByIdAndUpdate({ _id }, { bbgUsername: req.body.bbgUsername })
			.then(() => User.findById({ _id }))
      .then(user => res.send(user))
      .catch(error => console.log(error));

		const options = {
			uri: `https://bgg-json.azurewebsites.net/collection/${req.body.bbgUsername}`,
			json: true,
		};

		rp(options)
			.then(body => {
				body.forEach( bbgGame => saveGameFromBBG(bbgGame));
			})
			.catch(err => {
				console.log('Error Fetching Game List');
				console.log(err);
			});
	});
};
