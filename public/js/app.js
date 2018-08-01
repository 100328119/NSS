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
  $scope.CurrentIndex="";
  $scope.selectedItem = {};
	$http.get('/Netdata/bcls/1')
		.then(function(response){
			$scope.Network = response.data;
	});

  $scope.selectItem = function(SelectedItem){
    $scope.CurrentIndex = $scope.Network.End_Device.indexOf(SelectedItem);
    $scope.selectedItem = angular.copy(SelectedItem);
    console.log($scope.CurrentIndex);
    console.log($scope.selectedItem);
  };

  //End Device function add, update, Delete
  // status of object add = 1 ;update = 0; Delete = -1;
  $scope.addEndDevice = function(){
    $scope.NewEndevice['Status'] = 1;
    $scope.Network.End_Device.push($scope.NewEndevice);
    $scope.NewEndevice = {};
    console.log($scope.Network.End_Device);
  };

  $scope.editEndDevice = function(){
      //$scope.Network.End_Device[$scope.CurrentIndex] = $scope.selectedItem;
      $scope.Network.End_Device.splice($scope.Network.End_Device.indexOf($scope.selectedItem), 1);
      $scope.selectedItem.Status = 0;
      $scope.Network.End_Device.push($scope.selectedItem);
      console.log($scope.Network.End_Device);
  };

  $scope.deleteEndDevice = function(){
    $scope.Network.End_Device[$scope.CurrentIndex].Status = -1;
  };


	// $scope.saveUser = function(){
	// 	console.log("Saving...");
	// 	$scope.users.push($scope.newUser);
	// 	$scope.info = "New User Added Successfully!";
	// 	$scope.newUser = {};
	// };
  //
	// $scope.selectUser = function(user){
	// 	$scope.clickedUser = user;
	// };
  //
	// $scope.deleteUser = function(){
	// 	console.log($scope.users.indexOf($scope.clickedUser));
	// 	$scope.users.splice($scope.users.indexOf($scope.clickedUser), 1);
	// 	$scope.info = "User Deleted Successfully!";
	// };
  //
	// $scope.clearInfo = function(){
	// 	$scope.info = "";
	// };
});
