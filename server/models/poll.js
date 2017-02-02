var mongoose = require('mongoose');

var PollSchema = new mongoose.Schema({
	question: String,
	_user: {type: mongoose.Schema.ObjectId, ref: 'User'},
},{timestamps: true});

var Poll = mongoose.model('Poll', PollSchema);