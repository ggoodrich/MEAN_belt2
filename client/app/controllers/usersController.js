app.controller('usersController', ['clientFactory','$location','$routeParams', '$cookies', function(clientFactory,$location,$routeParams,$cookies){
	var self = this;
	self.friends = [];

	self.addUser = function(){
		clientFactory.addUser(self.newUser,function(newUser,callback){
			self.newUser = newUser;
			$cookies.put('userId', self.newUser._id);
			$cookies.put('userName', self.newUser.name);
			self.newUser = {};
			$location.url('/dashboard');
		})
		
	}

}])