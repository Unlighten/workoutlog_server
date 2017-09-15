var router = require('express').Router();
var sequelize = require('../db.js');
var User = sequelize.import('../models/user');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

router.post('/', function(req, res) {
		var username = req.body.user.username;
		var pass = req.body.user.password;
		var fname = req.body.user.fname;
		var lname = req.body.user.lname;
		var email = req.body.user.email;
		var pic = req.body.user.pic;

		//Need to create a user object and use sequelize to put that user into
		//

		User.create({
			username: username,
			passwordhash: bcrypt.hashSync(pass, 10),
			fname: fname,
			lname: lname,
			email: email,
			pic: pic

		}).then(
		//Sequelize is going to return the object it created from db.

			function createSuccess(user){
				var token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});

				res.json({
						user: user,
						message: 'created',
						sessionToken: token
				});
			},
			function createError(err){
				res.send(500, err.message);
			}
		);
	});

module.exports = router;