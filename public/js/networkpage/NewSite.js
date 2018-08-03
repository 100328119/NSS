var NewSite = angular.module('NewSite', []).config(($interpolateProvider)=>{
  $interpolateProvider.startSymbol('{[{').endSymbol('}]}');
});

NewSite.controller("NewSiteController",($scope,$http)=>{
  $scope.NewSite = {};
  //New End Device Setup
  $scope.NewEndDevice = ()=>{
    var NewNet = {};
    $scope.NewSite.End_Device.splice(0,0,NewNets);
  };

  $scope.CloneEndDevice = (Clone)=>{
    var index = $scope.NewSite.End_Device.indexOf(Clone);
    $scope.NewSite.End_Device.splice(index, 0, angular.copy(Clone));
  };

  //New WAN setup
  $scope.NewWAN = ()=>{
    var NewWAN = {}
    $scope.NewSite.WAN.splice(0,0,angular.copy(Clone));
  };

  $scope.CloneWAN = (Clone)=>{
    var index = $scope.NewSite.WAN.indexOf(Clone);
    $scope.NewSite.WAN.splice(index, 0 , angular.copy(Clone));
  };

  $scope.NewNetDevice = ()=>{
    var NewNetDevice = {};
    $scope.NewSite.Net_Device.splice(0,0,angular.copy(Clone));
  };

  $scope.CloneNetDevice = (Clone)=>{
    var index = $scope.NewSite.Net_Device.indexOf(Clone);
    $scope.NewSite.Net_Device.splice(idnex,0,angular.copy(Clone))
  };

  $scope.NewVLAN = ()=>{
    var NewVLAN = {};
    $scope.NetSite.Net_Device.splice(0,0,NewVLAN);
  };

  $scope.CloneVLAN = (Clone)=>{
    var index = $scope.NewSite.VLANs.indexOf(Clone);
    $scope.NetSite.VLANs.splice(index,0,Clone);
  };

  $
});
