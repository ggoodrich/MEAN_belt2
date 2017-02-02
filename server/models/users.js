var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
	name: String,
},{timestamps: true});

var User = mongoose.model('User', UserSchema)