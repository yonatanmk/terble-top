const mongoose = require('mongoose');

const User = mongoose.model('users'); // Dont import models, access them like this via mongoose

module.exports = app => {
	app.post('/api/add-bbg-username', (req, res) => {
     const { _id } = req.user;
     console.log(`the id is ${_id}`);
     console.log(req.body.username);
     User.findByIdAndUpdate({ _id }, { bbgUsername: req.body.username })
      .then(() => User.findById({ _id }))
      .then(user => res.send(user))
      .catch(error => console.log(error));
	});
};

// edit: function(req, res, next) { // method 3 for storing func in controller
//   const userid = req.user.id;
//   const driverProps = req.body;
//
//   Driver.findByIdAndUpdate({ _id: driverId }, driverProps)
//     .then(() => Driver.findById({ _id: id }))
//     .then(driver => res.send(driver))
//     .catch(next);
// },
