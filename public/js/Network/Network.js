// var myApp = angular.module("myApp", []).config(function($interpolateProvider){
//  $interpolateProvider.startSymbol('{[{').endSymbol('}]}');
// });
// "use strict";
nss.controller("myController", function($scope, $http,$location,$window,$filter){
	// console.log($routeParams.id);
	$scope.Network = {};
  $scope.NewEndevice = {};
  $scope.NewVlAN = {};
  $scope.NewNetDevice ={};
  $scope.CurrentIndex="";
  $scope.selectedItem = {};
	$scope.newUpdate = {};
	var loading = angular.element('#loading');
	//page initial
	$scope.NetworkInit = function(){
		  // loading.modal('show');
			var url = $location.absUrl().split('/');
			$scope.id = url[4];
			$http.get('/api/Netdata/Site/'+$scope.id)
				.then(function(response){
					$scope.Network = angular.copy(response.data);
					angular.element(document).ready(function () {
						angular.element('#EndDtable').DataTable({
						     columnDefs: [
						       { type: 'ip-address', targets: 0 }
						     ]
						  });
						angular.element('#WANTable').DataTable();
						angular.element('#NDeviceTable').DataTable();
						angular.element('#VLANTable').DataTable();
						});
					console.log($scope.Network);
			});
			//get vlan Information
			$http.get('/api/Netdata/vlan')
				.then(function successCallback(res){
					console.log(res.data);
					$scope.vlans = angular.copy(res.data);
				}, function errorCallback(res){
					console.log(res.data);
				});

			$http.get('/api/Netdata/category')
				.then(function successCallback(res){
					$scope.cates = angular.copy(res.data);
					console.log($scope.cates);
				}, function errorCallback(res){
					console.log(res.data);
				});

				$scope.newUpdate.Update_date = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss');
			};

		  $scope.SaveNetwork = function(){
		    console.log("save fired");
		    console.log($scope.Network);
				$scope.newUpdate.Update_date = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss');
				$scope.newUpdate.net_id = $scope.id;
				$scope.Network.Update_history = $scope.newUpdate;
				delete $scope.Network.network_info.Category;
				console.log($scope.Network);
		     $http.put('/api/Netdata/update/'+$scope.id,$scope.Network)
		      .then(function successCallback(response){
		         console.log(response);
						 if(response.status === 200){
							  $window.location.reload();
						 }
		      },function errorCallback(response){
		          console.log(response);
		      });
				};

				$scope.deleteNet = function(){
					$http.delete('/api/Netdata/delete/'+$scope.id)
					.then(function successCallback(res){
						 $window.location.href = '/dashboard';
					}, function errorCallback(res){
						console.log(res.data);
					});
				}
  //End Device function add, update, Delete
  // status of object add = 1 ;update = 0; Delete = -1;
  $scope.selectItem = function(SelectedItem){
    $scope.CurrentIndex = $scope.Network.End_Devices.indexOf(SelectedItem);
    $scope.selectedItem = angular.copy(SelectedItem);
		console.log($scope.selectedItem);
  };

  $scope.addEndDevice = function(){
    $scope.NewEndevice.Status = 1;
		$scope.NewEndevice.net_id = $scope.id;
    $scope.Network.End_Devices.push($scope.NewEndevice);
    $scope.NewEndevice = {};
  };

  $scope.editEndDevice = function(){
      //$scope.Network.End_Device[$scope.CurrentIndex] = $scope.selectedItem;
      $scope.selectedItem.Status = 0;
			$scope.tempEndDevice = angular.copy($scope.Network.End_Devices);
      $scope.tempEndDevice[$scope.CurrentIndex]=$scope.selectedItem;
			$scope.Network.End_Devices = angular.copy($scope.tempEndDevice);
			// angular.element('#EndDtable').DataTable().draw();
  };

  $scope.deleteEndDevice = function(){
    $scope.Network.End_Devices[$scope.CurrentIndex].Status = -1;
    console.log($scope.Network.End_Device);
  };
  //end of EnddEVICE Section

  //start WAN function
  $scope.selectWAN = function(wan){
    $scope.CurrentIndex = $scope.Network.WANs.indexOf(wan);
    $scope.selectedItem = angular.copy(wan);
  };

  $scope.addWAN = function(){
    $scope.NewWAN.Status = 1;
		$scope.NewWAN.net_id = $scope.id;
    $scope.Network.WANs.push($scope.NewWAN);
    $scope.NewWAN = {};
  };

  $scope.editWAN = function(){
      //$scope.Network.End_Device[$scope.CurrentIndex] = $scope.selectedItem;
      $scope.selectedItem.Status = 0;
			$scope.tempWAN = angular.copy($scope.Network.WANs);
      $scope.tempWAN[$scope.CurrentIndex]=$scope.selectedItem;
			$scope.Network.WANs = angular.copy($scope.tempWAN);
  };

  $scope.deleteWAN = function(){
    $scope.Network.WANs[$scope.CurrentIndex].Status = -1;
  };

  //start Router/switch
  $scope.selectNetDevice = function(netdevice){
    $scope.CurrentIndex = $scope.Network.Net_devices.indexOf(netdevice);
    $scope.selectedItem = angular.copy(netdevice);
  };

  $scope.addNetDevice = function(){
    $scope.NewNetDevice.Status = 1;
		$scope.NewNetDevice.net_id = $scope.id;
    $scope.Network.Net_devices.push($scope.NewNetDevice);
    $scope.NewNetDevice = {};
  };

  $scope.editNewNetDevice = function(){
      $scope.selectedItem.Status = 0;
			$scope.tempNet_devices = angular.copy($scope.Network.Net_devices);
      $scope.tempNet_devices[$scope.CurrentIndex]=$scope.selectedItem;
			$scope.Network.Net_devices = angular.copy($scope.tempNet_devices);
			console.log($scope.Network.Net_devices);
  };

  $scope.deleteNewNetDevice = function(){
    $scope.Network.Net_devices[$scope.CurrentIndex].Status = -1;
  };

  //start VLAN
  $scope.selectedVLAN = function(vlan){
		$scope.selectedVlan_number = vlan.vlan_id;
		$scope.vlan_description = $scope.vlans[$scope.selectedVlan_number-1].Description;
		console.log($scope.selectedVlan_number);
    $scope.CurrentIndex = $scope.Network.VlanNetwork.indexOf(vlan);
    $scope.selectedItem = angular.copy(vlan);
  };

	$scope.VlanChange = function(selectedVlan_number){
		console.log(selectedVlan_number);
		$scope.vlan_description = $scope.vlans[selectedVlan_number-1].Description;
		// $scope.selectedItem.net_id = selectedVLANitem.id;
	};

  $scope.addVLAN = function(){
    $scope.NewVLAN.Status = 1;
		$scope.NewVLAN.vlan_id = $scope.selectedVlan_number;
		$scope.NewVLAN.net_id = $scope.id;
		console.log($scope.NewVLAN);
    $scope.Network.VlanNetwork.push($scope.NewVLAN);
    $scope.NewVLAN = {};
  };

  $scope.editVlan = function(){
      //$scope.Network.End_Device[$scope.CurrentIndex] = $scope.selectedItem;
      $scope.selectedItem.Status = 0;
			$scope.selectedItem.vlan_id = $scope.selectedVlan_number;
			console.log($scope.selectedItem.vlan_id);
			$scope.TempVlanNetwork = angular.copy($scope.Network.VlanNetwork);
      $scope.TempVlanNetwork[$scope.CurrentIndex]=$scope.selectedItem;
			$scope.Network.VlanNetwork = angular.copy($scope.TempVlanNetwork);
  };

  $scope.deleteVlan = function(){
    $scope.Network.VlanNetwork[$scope.CurrentIndex].Status = -1;
  };

	$scope.selectNetwork = function(){
		$scope.selectedItem = angular.copy($scope.Network.network_info);
		$scope.selectedCate = $scope.selectedItem.Category_id;
	};

	$scope.NetChange = function(cate){
		 	console.log(cate);
			$scope.selectedItem.Category_id = cate;
	};

	$scope.editNetwork = function(){
		$scope.Network.network_info = angular.copy($scope.selectedItem);
		console.log($scope.Network.network_info)
	};
});
