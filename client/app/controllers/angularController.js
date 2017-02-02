app.controller('angularController', ['clientFactory', '$location', '$route', '$routeParams', '$cookies', function(clientFactory,$location,$route,$routeParams,$cookies){
	var self = this;
	self.name = $cookies.get('userName');
	self.id = $cookies.get('userId');
	self.polls = [];
	self.options = [];
	self.reject = {};

	clientFactory.getPolls(function(data){
		self.polls = data;
	});
	self.getOptions = function(){
		poll = $routeParams.id;
		clientFactory.getOptions(poll,function(data){
		self.options = data;
		});
	}
	self.logout = function(){
		$cookies.remove('userId');
		$cookies.remove('userName');
		$location.url('/');
	}
	self.createPoll = function(){
		clientFactory.createPoll(self.id, self.newPoll, function(data){
			if(data.type == 'reject'){
				self.reject = data;
			}
			else {
				$location.url('/dashboard');
			}
		})	
	}
	self.addVote = function(option){
		clientFactory.addVote(option,function(response){
			$route.reload();
		});
	};
	self.delete = function(id){
		clientFactory.deletePoll(id, function(response){
			$route.reload();
		});
	}
	
}]);