// var NewSite = angular.module('NewSite', []).config(($interpolateProvider)=>{
//   $interpolateProvider.startSymbol('{[{').endSymbol('}]}');
// });
// "use strict";
nss.controller("NewSiteController",function($scope,$http,$window){
  $scope.NewSite = {};
  $scope.network_info = {};
  $scope.End_Device = [];
  $scope.NewWANs = [];
  $scope.NewNetDevices = [];
  $scope.NewVLANs =[];
  $scope.change = 0;

  //get category
  $http.get('/api/Netdata/category')
    .then(function successCallback(res){
      console.log(res.data);
       $scope.category = angular.copy(res.data);
    },function errorCallback(res){
      console.log(res);
    });

  //get vlan Information
  $http.get('/api/Netdata/vlan')
    .then(function successCallback(res){
      console.log(res.data);
      $scope.vlans = angular.copy(res.data);
    }, function errorCallback(res){
      console.log(res.data);
    });

  $scope.SaveNewSite = function(){
    $scope.NewSite.network_info = angular.copy($scope.network_info);
    $scope.NewSite.End_Devices = angular.copy($scope.End_Device);
    $scope.NewSite.WANs = angular.copy($scope.NewWANs);
    $scope.NewSite.Net_Devices = angular.copy($scope.NewNetDevices);
    $scope.NewSite.VLANs = angular.copy($scope.NewVLANs);
    console.log($scope.NewSite);
    $http.post('/api/Netdata/new', $scope.NewSite)
      .then( function successCallback(response){
          console.log(response);
          $window.location.href = '/Network/'+response.data.insertId;
      }, function errorCallback(response){
          console.log(response);
      });
  };

  //END device minipuplate
  $scope.NewEndDevice = function(){
    $scope.NewEnd =  {};
    $scope.End_Device.splice(0,0,$scope.NewEnd);
    $scope.change = 1;
  };

  $scope.CloneEndDevice = function(Clone){
    $scope.index = $scope.End_Device.indexOf(Clone);
    $scope.End_Device.splice($scope.index, 0, angular.copy(Clone));
    $scope.change = 1;
  };

  $scope.RemoveEndDevice = function(Clone){
    $scope.index = $scope.End_Device.indexOf(Clone);
    $scope.End_Device.splice($scope.index, 1);
    $scope.change = 1;
  };

  //New WAN setup
  $scope.NewWAN = function(){
    $scope.New_WAN = {};
    $scope.NewWANs.splice(0,0,$scope.New_WAN);
    $scope.change = 1;
  };

  $scope.CloneWAN = function(Clone){
    $scope.index = $scope.NewWANs.indexOf(Clone);
    $scope.NewWANs.splice($scope.index, 0 , angular.copy(Clone));
    $scope.change = 1;
  };

  $scope.RemoveWAN = function(Clone){
    $scope.index = $scope.NewWANs.indexOf(Clone);
    $scope.NewWANs.splice($scope.index, 1);
    $scope.change = 1;
  };

  //Net_Device minipuplate
  $scope.NewNetDevice = function(){
    $scope.New_NetDevice = {};
    $scope.NewNetDevices.splice(0,0,angular.copy($scope.New_NetDevice));
    $scope.change = 1;
  };

  $scope.CloneNetDevice = function(Clone){
    $scope.index = $scope.NewNetDevices.indexOf(Clone);
    $scope.NewNetDevices.splice($scope.idnex,0,angular.copy(Clone));
    $scope.change = 1;
  };

  $scope.RemoveNetDevice = function(Clone){
    $scope.index = $scope.NewNetDevices.indexOf(Clone);
    $scope.NewNetDevices.splice($scope.idnex,1);
    $scope.change = 1;
  };

  //VKAN minipuplate
  $scope.NewVLAN = function(){
    $scope.New_VLAN = {};
    $scope.NewVLANs.splice(0,0,$scope.New_VLAN);
    $scope.change = 1;
  };

  $scope.CloneVLAN = function(Clone){
    $scope.index = $scope.NewVLANs.indexOf(Clone);
    $scope.NewVLANs.splice($scope.index,0,angular.copy(Clone));
    $scope.change = 1;
  };

  $scope.RemoveVLAN = function(Clone) {
    $scope.index = $scope.NewVLANs.indexOf(Clone);
    $scope.NewVLANs.splice($scope.index,1);
    $scope.change = 1;
  };

  $scope.VlanChange = function(NewVLAN, vlan){
    // console.log(NewVLAN);
    // console.log(vlan)
    NewVLAN.Description = vlan.Description;
    NewVLAN.vlan_id = vlan.id;
    $scope.change = 1;
    // console.log($scope.selectedVLAN);
    // NewVLAN.Description = VlanDescription;
  }

});
