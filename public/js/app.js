var myApp = angular.module("myApp", []).config(function($interpolateProvider){
 $interpolateProvider.startSymbol('{[{').endSymbol('}]}');
});

myApp.controller("myController", function($scope, $http){
	console.log("in controller...");
	$scope.newUser = {};
	$scope.info = "";
	$scope.Network = {};
	$http.get('/Netdata/bcls/1')
		.then(function(response){
			$scope.Network = response.data;
		});
	console.log($scope.Network);
	$scope.users = [
		{username: "rimon", fullName: "Md. Mamunur Rashid Rimon", email:"rimonmath@gmail.com"},
		{username: "shamim", fullName: "Md. Tamim Hossain", email:"shamim@gmail.com"},
		{username: "tamim", fullName: "Tamim Iqbal", email:"tamim@gmail.com"}
	];

	$scope.saveUser = function(){
		console.log("Saving...");
		$scope.users.push($scope.newUser);
		$scope.info = "New User Added Successfully!";
		$scope.newUser = {};
	};

	$scope.selectUser = function(user){
		$scope.clickedUser = user;
	};

	$scope.deleteUser = function(){
		console.log($scope.users.indexOf($scope.clickedUser));
		$scope.users.splice($scope.users.indexOf($scope.clickedUser), 1);
		$scope.info = "User Deleted Successfully!";
	};

	$scope.clearInfo = function(){
		$scope.info = "";
	};
});
