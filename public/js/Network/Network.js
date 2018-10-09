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
			};

//--------------------end device CRUD------------------------------//
	$scope.selectEndDevice = function(SelectedItem){
    $scope.selectedItem = angular.copy(SelectedItem);
  };

	$scope.addEndDevice = function(){
		$scope.NewEndevice.net_id = $scope.id;
		$http.post('/api/Netdata/end_device/'+$scope.id,$scope.NewEndevice)
			.then(function successCallback(res){
				angular.element('#EndDtable').DataTable().destroy();
				$scope.Network.End_Devices = angular.copy(res.data);
				angular.element(document).ready(function () {
					 angular.element('#EndDtable').DataTable({
								columnDefs: [
									{ type: 'ip-address', targets: 0 }
								]
						 });
				 });
				 $scope.NewEndevice={};
			}, function errorCallback(res){
				$scope.NewEndevice={};
				console.log(res);
			});
  };

  $scope.editEndDevice = function(){
		$http.put('/api/Netdata/end_device/'+$scope.id,$scope.selectedItem)
			.then(function successCallback(res){
				angular.element('#EndDtable').DataTable().destroy();
				$scope.Network.End_Devices = angular.copy(res.data);
				angular.element(document).ready(function () {
					 angular.element('#EndDtable').DataTable({
								columnDefs: [
									{ type: 'ip-address', targets: 0 }
								]
						 });
				 });
				 $scope.selectedItem={};
			}, function errorCallback(res){
				$scope.selectedItem={};
				console.log(res);
			});
  }

  $scope.deleteEndDevice = function(){
		console.log('/api/Netdata/end_device/'+$scope.id+'/'+$scope.selectedItem.id);
		$http.delete('/api/Netdata/end_device/'+$scope.id+'/'+$scope.selectedItem.id)
			.then(function successCallback(res){
				angular.element('#EndDtable').DataTable().destroy();
				$scope.Network.End_Devices = angular.copy(res.data);
				angular.element(document).ready(function () {
					 angular.element('#EndDtable').DataTable({
								columnDefs: [
									{ type: 'ip-address', targets: 0 }
								]
						 });
				 });
				 $scope.selectedItem={};
			}, function errorCallback(res){
				$scope.selectedItem={};
				console.log(res);
			});
  };

  //------------------ WAN function ----------------------------//
  $scope.selectWAN = function(wan){
    $scope.selectedItem = angular.copy(wan);
  };

  $scope.addWAN = function(){
		$scope.NewWAN.net_id = $scope.id;
		$http.post('/api/Netdata/WAN/'+$scope.id, $scope.NewWAN)
			.then(function successCallback(res){
				angular.element('#WANTable').DataTable().destroy();
				$scope.Network.WANs = angular.copy(res.data);
				angular.element(document).ready(function () {
					 angular.element('#WANTable').DataTable();
				 })
				 $scope.NewWAN = {};
			}, function errorCallback(res){
				$scope.NewWAN = {};
				console.log(res);
			});
  };

  $scope.editWAN = function(){
			$http.put('/api/Netdata/WAN/'+$scope.id,$scope.selectedItem)
				.then(function successCallback(res){
					angular.element('#WANTable').DataTable().destroy();
					$scope.Network.WANs = angular.copy(res.data);
					angular.element(document).ready(function () {
						 angular.element('#WANTable').DataTable();
					 });
					 $scope.selectedItem={};
				}, function errorCallback(res){
					$scope.selectedItem={};
					console.log(res);
				});
  };

  $scope.deleteWAN = function(){
		console.log($scope.selectedItem.id);
		$http.delete('/api/Netdata/WAN/'+$scope.id+'/'+$scope.selectedItem.id)
			.then(function successCallback(res){
				angular.element('#WANTable').DataTable().destroy();
				$scope.Network.WANs = angular.copy(res.data);
				angular.element(document).ready(function () {
					 angular.element('#WANTable').DataTable();
				 });
				 $scope.selectedItem={};
			}, function errorCallback(res){
				$scope.selectedItem={};
				console.log(res);
			});
  };

  //------------------------------ Router/switch-----------------------------------//
  $scope.selectNetDevice = function(netdevice){
    $scope.selectedItem = angular.copy(netdevice);
  };

  $scope.addNetDevice = function(){
    $scope.NewNetDevice.net_id = $scope.id;
		$http.post('/api/Netdata/net_device/'+$scope.id,$scope.NewNetDevice)
			.then(function successCallback(res){
				angular.element('#NDeviceTable').DataTable().destroy();
				$scope.Network.Net_devices = angular.copy(res.data);
				angular.element(document).ready(function () {
					 angular.element('#NDeviceTable').DataTable();
				 });
				 $scope.NewNetDevice={};
			}, function errorCallback(res){
				$scope.NewNetDevice={};
				console.log(res);
			});
  };

  $scope.editNewNetDevice = function(){
			$http.put('/api/Netdata/net_device/'+$scope.id,$scope.selectedItem)
				.then(function successCallback(res){
					angular.element('#NDeviceTable').DataTable().destroy();
					$scope.Network.Net_devices = angular.copy(res.data);
					angular.element(document).ready(function () {
						 angular.element('#NDeviceTable').DataTable();
					 });
					 $scope.selectedItem={};
				}, function errorCallback(res){
					$scope.selectedItem={};
					console.log(res);
				});
  };

  $scope.deleteNewNetDevice = function(){
		$http.delete('/api/Netdata/net_device/'+$scope.id+'/'+$scope.selectedItem.id)
			.then(function successCallback(res){
				angular.element('#NDeviceTable').DataTable().destroy();
				$scope.Network.Net_devices = angular.copy(res.data);
				console.log($scope.Network.Net_devices);
				angular.element(document).ready(function () {
					 angular.element('#NDeviceTable').DataTable();
				 });
				 $scope.selectedItem={};
			}, function errorCallback(res){
				$scope.selectedItem={};
				console.log(res);
			});
  };

  //start VLAN
  $scope.selectedVLAN = function(vlan){
		$scope.selectedVlan_number = vlan.vlan_id;
		$scope.vlan_description = $scope.vlans[$scope.selectedVlan_number-1].Description;
    $scope.selectedItem = angular.copy(vlan);
  };

	$scope.VlanChange = function(selectedVlan_number){
		$scope.vlan_description = $scope.vlans[selectedVlan_number-1].Description;
	};

  $scope.addVLAN = function(){
		$scope.NewVLAN.vlan_id = $scope.selectedVlan_number;
		$scope.NewVLAN.net_id = $scope.id;
		$http.post('/api/Netdata/VlanNetwork/'+$scope.id,$scope.NewVLAN)
			.then(function successCallback(res){
				angular.element('#VLANTable').DataTable().destroy();
				$scope.Network.VlanNetwork = angular.copy(res.data);
				angular.element(document).ready(function () {
					 angular.element('#VLANTable').DataTable();
				 })
				 $scope.NewVLAN={};
			}, function errorCallback(res){
				console.log(res);
				$scope.NewVLAN={};
			});
  };

  $scope.editVlan = function(){
			$scope.selectedItem.vlan_id = $scope.selectedVlan_number;
			$http.put('/api/Netdata/VlanNetwork/'+$scope.id,$scope.selectedItem)
				.then(function successCallback(res){
					angular.element('#VLANTable').DataTable().destroy();
					$scope.Network.VlanNetwork = angular.copy(res.data);
					angular.element(document).ready(function () {
						 angular.element('#VLANTable').DataTable();
					 })
				}, function errorCallback(res){
					console.log(res);
				});
  };

  $scope.deleteVlan = function(){
		$http.delete('/api/Netdata/VlanNetwork/'+$scope.id+'/'+$scope.selectedItem.id)
			.then(function successCallback(res){
				angular.element('#VLANTable').DataTable().destroy();
				$scope.Network.VlanNetwork = angular.copy(res.data);
				angular.element(document).ready(function () {
					 angular.element('#VLANTable').DataTable();
				 })
			}, function errorCallback(res){
				console.log(res);
			});
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
		// $scope.Network.network_info = angular.copy($scope.selectedItem);
		delete $scope.selectedItem.Category;
		$http.put('/api/Netdata/networkinfo/'+$scope.id,$scope.selectedItem)
		.then(function successCallback(res){
			console.log(res.data);
			$scope.Network.network_info = angular.copy(res.data);
			$scope.selectedItem={};
		}, function errorCallback(res){
			$scope.selectedItem={};
			console.log(res);
		});
	};

	$scope.deleteNet = function(){
		$http.delete('/api/Netdata/delete/'+$scope.id)
		 .then(function successCallback(res){
			 $window.location.href = '/dashboard';
		 }, function errorCallback(res){
			 console.log(res);
		 });
	}
});
