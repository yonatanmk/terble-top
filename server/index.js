const express = require('express');
const app = express();

app.get('/', (req, res) => {
	res.send({ hi: 'there' });
});

const PORT = process.env.PORT || 5000 // lets heroku declare which port our app will use, default of 5000
app.listen(PORT);
