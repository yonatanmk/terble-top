const mongoose = require('mongoose');
const rp = require('request-promise');

const { saveOrUpdateGame, ignoreGame } = require('../lib/game-utils');

const User = mongoose.model('users'); // Dont import models, access them like this via mongoose

module.exports = app => {
	app.post('/api/add-bbg-username', (req, res) => {
    const { _id } = req.user;
		const { bbgUsername } = req.body;

		User.findById({ _id })
			.then(user => {
				user.bbgUsername = bbgUsername;
				const options = {
					uri: `https://bgg-json.azurewebsites.net/collection/${bbgUsername}`,
					json: true,
				};

				return rp(options)
					.then(body => {
						const promiseActions = body
							.filter(bbgGame => !ignoreGame(bbgGame))
							.map(bbgGame => {
								if (!user.games.includes(bbgGame.gameId.toString())) {
									user.games.push(bbgGame.gameId);
								}

								return saveOrUpdateGame(bbgGame);
							});

						return Promise.all(promiseActions)
							.then(() => {
								return user.save();
							})
							.then(() => res.send(user))
					});
			});
	});
};
