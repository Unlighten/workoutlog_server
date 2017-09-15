var Sequelize = require('sequelize');
var sequelize = new Sequelize(process.env.DATABASE_URL || 'postgres://postgres:edbpostgres2legacy2@localhost:5432/workoutlog', {
	dialect: 'postgres'
});

// var sequelize = new Sequelize('workoutlog','postgres','edbpostgres2legacy2', {
// 	host: 'localhost',
// 	dialect: 'postgres'
// })

sequelize.authenticate().then(
	function() {
		console.log('connected to workoutlog postgres db');
	},
	function(err){
		console.log(err);
	}
);


var User = sequelize.import('./models/user');

module.exports = sequelize;