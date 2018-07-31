var myApp = angular.module("myApp", []).config(function($interpolateProvider){
 $interpolateProvider.startSymbol('{[{').endSymbol('}]}');
});

myApp.controller("myController", function($scope, $http){
	console.log("in controller...");
	$scope.newUser = {};
	$scope.info = "";
	$scope.Network = {};
  $scope.NewEndevice = {};
  $scope.NewVlAN = {};
  $scope.NewNetDevice ={};
	$http.get('/Netdata/bcls/1')
		.then(function(response){
			$scope.Network = response.data;
	});

	console.log($scope.Network);

  $scope.addEndDevice = function(){
    //should add on a new field to to declear the new data
    $scope.Network.End_Device.push($scope.NewEndevice);
    $scope.NewEndevice = {};
  };

  $scope.editEndDevice = function(EndDevice){

  };

  $scope.selectEndDevice = function(EndDevice){
    $scope.selectedEndDevice = EndDevice;
  };

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
