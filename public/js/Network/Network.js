// var myApp = angular.module("myApp", []).config(function($interpolateProvider){
//  $interpolateProvider.startSymbol('{[{').endSymbol('}]}');
// });

nss.controller("myController", function($scope, $http,$location,$routeParams,$route){
	console.log("in controller...");
	// console.log($routeParams.id);
	$scope.Network = {};
  $scope.NewEndevice = {};
  $scope.NewVlAN = {};
  $scope.NewNetDevice ={};
  $scope.CurrentIndex="";
  $scope.selectedItem = {};
	//page initial
	$scope.NetworkInit = function(){
			var url = $location.absUrl().split('/');
			$scope.id = url[4];
			$http.get('/api/Netdata/bcls/'+$scope.id)
				.then(function(response){
					$scope.Network = angular.copy(response.data);
					console.log($scope.Network);
			});
	};

  $scope.SaveNetwork = function(){
    console.log("save fired");
    console.log($scope.Network);
     $http.put('/api/Netdata/update/1',$scope.Network)
      .then(function successCallback(response){
         console.log(response);
      },function errorCallback(response){
          console.log(response);
      });

  };
  //End Device function add, update, Delete
  // status of object add = 1 ;update = 0; Delete = -1;
  $scope.selectItem = function(SelectedItem){
    console.log("item selected");
    $scope.CurrentIndex = $scope.Network.End_Device.indexOf(SelectedItem);
    $scope.selectedItem = angular.copy(SelectedItem);
  };

  $scope.addEndDevice = function(){
    $scope.NewEndevice.Status = 1;
    $scope.Network.End_Device.push($scope.NewEndevice);
    $scope.NewEndevice = {};
  };

  $scope.editEndDevice = function(){
      //$scope.Network.End_Device[$scope.CurrentIndex] = $scope.selectedItem;
      $scope.selectedItem.Status = 0;
      $scope.Network.End_Device[$scope.CurrentIndex]=$scope.selectedItem;
  };

  $scope.deleteEndDevice = function(){
    $scope.Network.End_Device[$scope.CurrentIndex].Status = -1;
    console.log($scope.Network.End_Device);
  };
  //end of EnddEVICE Section

  //start WAN function
  $scope.selectWAN = function(wan){
    $scope.CurrentIndex = $scope.Network.WAN.indexOf(wan);
    $scope.selectedItem = angular.copy(wan);
  };

  $scope.addWAN = function(){
    $scope.NewWAN.Status = 1;
    $scope.Network.WAN.push($scope.NewWAN);
    $scope.NewWAN = {};
  };

  $scope.editWAN = function(){
      //$scope.Network.End_Device[$scope.CurrentIndex] = $scope.selectedItem;
      $scope.selectedItem.Status = 0;
      $scope.Network.WAN[$scope.CurrentIndex]=$scope.selectedItem;
  };

  $scope.deleteWAN = function(){
    $scope.Network.WAN[$scope.CurrentIndex].Status = -1;
  };

  //start Router/switch
  $scope.selectNetDevice = function(netdevice){
    $scope.CurrentIndex = $scope.Network.Net_Device.indexOf(netdevice);
    $scope.selectedItem = angular.copy(netdevice);
  };

  $scope.addNetDevice = function(){
    $scope.NewNetDevice.Status = 1;
    $scope.Network.Net_Device.push($scope.NewNetDevice);
    $scope.NewNetDevice = {};
  };

  $scope.editNewNetDevice = function(){
      //$scope.Network.End_Device[$scope.CurrentIndex] = $scope.selectedItem;
      $scope.selectedItem.Status = 0;
      $scope.Network.Net_Device[$scope.CurrentIndex]=$scope.selectedItem;
  };

  $scope.deleteNewNetDevice = function(){
    $scope.Network.Net_Device[$scope.CurrentIndex].Status = -1;
  };

  //start VLAN
  $scope.selectedVLAN = function(vlan){
    $scope.CurrentIndex = $scope.Network.VLANs.indexOf(vlan);
    $scope.selectedItem = angular.copy(vlan);
  };

  $scope.addVLAN = function(){
    $scope.NewVLAN.Status = 1;
    $scope.Network.VLANs.push($scope.NewNetDevice);
    $scope.NewVLAN = {};
  };

  $scope.editVlan = function(){
      //$scope.Network.End_Device[$scope.CurrentIndex] = $scope.selectedItem;
      $scope.selectedItem.Status = 0;
      $scope.Network.VLANs[$scope.CurrentIndex]=$scope.selectedItem;
  };

  $scope.deleteVlan = function(){
    $scope.Network.VLANs[$scope.CurrentIndex].Status = -1;
  };
});
