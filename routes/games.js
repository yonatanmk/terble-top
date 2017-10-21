const rp = require('request-promise');

module.exports = app => {
	app.get('/api/games', (req, res) => {
		const options = {
			uri: 'https://bgg-json.azurewebsites.net/collection/yonatanmk',
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
