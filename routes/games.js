const rp = require('request-promise');

module.exports = app => {
	app.post('/api/games', (req, res) => {
		console.log(`https://bgg-json.azurewebsites.net/collection/${req.body.bbgUsername}`);
		const options = {
			uri: `https://bgg-json.azurewebsites.net/collection/${req.body.bbgUsername}`,
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
};
