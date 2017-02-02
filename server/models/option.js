var mongoose = require('mongoose');

var OptionSchema = new mongoose.Schema({
	option: String,
	_poll: {type: mongoose.Schema.ObjectId, ref: 'Poll'},
	count: Number,
},{timestamps:true});

var Option = mongoose.model('Option',OptionSchema);