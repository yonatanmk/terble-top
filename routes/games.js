const rp = require('request-promise');
const parser = require('xml2json');

const { getBestPlayerNumber } = require('../lib/bbg-api-parse');

module.exports = app => {
	app.get('/api/games', (req, res) => {
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

	// app.get('/api/games', (req, res) => {
	// 	const options = {
	// 		uri: `https://bgg-json.azurewebsites.net/collection/yonatanmk`,
	// 		json: true,
	// 	};
	//
	// 	rp(options)
	// 		.then(body => {
	// 			res.send(body);
	// 		})
	// 		.catch(err => {
	// 			console.log(err);
	// 		});
	// });

	app.get('/bbgxml', (req, res) => {
		const options = {
			uri: `https://www.boardgamegeek.com/xmlapi/boardgame/2536?&stats=1`,
			json: true,
		};

		rp(`https://www.boardgamegeek.com/xmlapi/boardgame/27225?&stats=1`)
			.then(body => {
				const json = JSON.parse(parser.toJson(body));
				res.send(getBestPlayerNumber(json));
			})
			.catch(err => {
				console.log(err);
			});
	});
};
