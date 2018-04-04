const mongoose = require('mongoose');
const rp = require('request-promise');
const parser = require('xml2json');

const { getBestPlayerNumber } = require('../lib/bbg-api-parse');
const { saveOrUpdateGame } = require('../lib/game-utils');

const Game = mongoose.model('games');

module.exports = app => {
	app.get('/api/bbg-games', (req, res) => {
		console.log(`Fetching games from https://bgg-json.azurewebsites.net/collection/${req.user.bbgUsername}`);
		const options = {
			uri: `https://bgg-json.azurewebsites.net/collection/${req.user.bbgUsername}`,
			json: true,
		};

		rp(options)
			.then(body => {
        res.send(body);
			})
			.catch(err => {
				console.log(err);
			});
	});

	app.get('/api/games', (req, res) => {
		const { user } = req;

		Game.find({ _id: { $in: user.games } })
			.then(games => res.send(games))
			.catch(err => res.status(500).json(err));
	});

	app.post('/api/get-best-players', (req, res) => {
		const { body } = req;

		saveOrUpdateGame(body) // body is { gameId }
			.then(game => res.send(game))
			// .then(game => reject())
			.catch(err => res.status(500).json("Error getting best player number."));
	});
	
	app.get('/bbgxml', (req, res) => {
		rp('https://www.boardgamegeek.com/xmlapi/boardgame/27225?&stats=1')
			.then(body => {
				const json = JSON.parse(parser.toJson(body));
				res.send(getBestPlayerNumber(json));
			})
			.catch(err => {
				console.log(err);
			});
	});
};
