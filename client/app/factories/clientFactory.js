app.factory('clientFactory', ['$http', function($http){
	var polls = "";
	var options = "";

	var factory = {};

	factory.addUser = function(newUser,callback){
		$http.put('/users/new', newUser).then(function(response){
			callback(response.data);
		})
	};

	factory.getPolls = function(callback){
		$http.get('/polls').then(function(response){
			data = response.data;
			callback(data);
		})
	}

	factory.getOptions = function(poll,callback){
		$http.get('/polls/'+poll).then(function(response){
			options = response.data;
			callback(options);
		})
	}
	
	factory.createPoll = function(user,poll,callback){
		$http.put('/polls/new', {user,poll}).then(function(response){
			callback(response.data);
		})
	};
	factory.addVote = function(option,callback){
		$http.put('/polls/vote/add', {option}).then(function(response){
			callback(response);
		})
	}
	factory.deletePoll = function(id,callback){
		$http.delete('/polls/delete/'+id).then(function(response){
			callback(response);
		})
	}
	

	return factory;

}])