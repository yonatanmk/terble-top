const mongoose = require('mongoose');
const rp = require('request-promise');
const parser = require('xml2json');

const { getBestPlayerNumber, roundRating } = require('../lib/bbg-api-parse');
const { shouldUpdateGame } = require('../lib/game-utils');

const User = mongoose.model('users'); // Dont import models, access them like this via mongoose
const Game = mongoose.model('games');

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
				body.forEach(bbgGame => {
					Game.findOne({ _id: bbgGame.gameId })
						.then(dbGame => {
							if (!dbGame) {
								const { gameId, name, image, maxPlayers, minPlayers, averageRating } = bbgGame;
								const rating = roundRating(averageRating);
								const game = {
									_id: gameId,
									name,
									image,
									maxPlayers,
									minPlayers,
									rating,
								}
								rp(`https://www.boardgamegeek.com/xmlapi/boardgame/${gameId}?&stats=1`)
									.then(body => {
										const json = JSON.parse(parser.toJson(body));
										game.bestPlayers = getBestPlayerNumber(json);
										(new Game(game)).save();
									})
									.catch( err => {
										console.log('Error Fetching Rating');
										console.log(err)
										(new Game(game)).save();
									});
							}
						})
				})
			})
			.catch(err => {
				console.log(err);
			});

	});
};
