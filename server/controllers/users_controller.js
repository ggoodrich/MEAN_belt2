var mongoose = require('mongoose'),
	User = mongoose.model('User');

function UsersController() {
	this.new = function(req,res){
		console.log('user_controller this.new: ',req.body)
		var newUser = new User(req.body);
		newUser.save(function(err,newUser){
			if(err){
				console.log("!!! new user not created",err);
			}
			else{
				res.json(newUser);
			}
		})
	}
};
module.exports = new UsersController();