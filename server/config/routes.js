var users = require('../controllers/users_controller.js');
var polls = require('../controllers/poll_controller.js');

module.exports = function(app){
	app.get('/polls',polls.index);
	app.put('/users/new',users.new);
	app.put('/polls/new', polls.new);
	app.delete('/polls/delete/:id', polls.delete);
	app.put('/polls/vote/add', polls.addVote);
	app.get('/polls/:id', polls.options);

	// app.get('/polls/:id', polls.options);
}

console.log('Routes Loaded');