var NewSite = angular.module('NewSite', []).config(($interpolateProvider)=>{
  $interpolateProvider.startSymbol('{[{').endSymbol('}]}');
});

NewSite.controller("NewSiteController",($scope,$http)=>{
  $scope.NewSite = {};
  $scope.End_Device = [];
  $scope.NewWANs = [];
  $scope.NewNetDevices = [];
  $scope.NewVLANs =[];
  //New End Device Setup
  $scope.getTemplate = ()=>{
    console.log("get Template")
    $http.get('/api/Netdata/template/BCCS')
      .then((response)=>{
        $scope.End_Device = angular.copy(response.data.End_Device);
        $scope.NewWANs = angular.copy(response.data.WAN);
        $scope.NewNetDevices = angular.copy(response.data.Net_Device);
        $scope.NewVLANs = angular.copy(response.data.VLANs);

    });
  };

  $scope.SaveNewSite = ()=>{
    $scope.NewSite.End_Device = angular.copy($scope.End_Device);
    $scope.NewSite.WAN = angular.copy($scope.NewWANs);
    $scope.NewSite.Net_Device = angular.copy($scope.NewNetDevices);
    $scope.NewSite.VLANs = angular.copy($scope.NewVLANs);
    console.log($scope.NewSite);
    $http.post('/api/Netdata/new', $scope.NewSite)
      .then( function successCallback(response){
          console.log(response);
      }, function errorCallback(response){
          console.log(response);
      });
  };

  //END device minipuplate
  $scope.NewEndDevice = ()=>{
    $scope.NewEnd =  {};
    $scope.End_Device.splice(0,0,$scope.NewEnd);
  };

  $scope.CloneEndDevice = (Clone)=>{
    $scope.index = $scope.End_Device.indexOf(Clone);
    $scope.End_Device.splice($scope.index, 0, angular.copy(Clone));
  };

  $scope.RemoveEndDevice = (Clone)=>{
    $scope.index = $scope.End_Device.indexOf(Clone);
    $scope.End_Device.splice($scope.index, 1);
  };

  //New WAN setup
  $scope.NewWAN = ()=>{
    $scope.New_WAN = {};
    $scope.NewWANs.splice(0,0,$scope.New_WAN);
  };

  $scope.CloneWAN = (Clone)=>{
    $scope.index = $scope.NewWANs.indexOf(Clone);
    $scope.NewWANs.splice($scope.index, 0 , angular.copy(Clone));
  };

  $scope.RemoveWAN = (Clone)=>{
    $scope.index = $scope.NewWANs.indexOf(Clone);
    $scope.NewWANs.splice($scope.index, 1);
  };

  //Net_Device minipuplate
  $scope.NewNetDevice = ()=>{
    $scope.New_NetDevice = {};
    $scope.NewNetDevices.splice(0,0,angular.copy($scope.New_NetDevice));
  };

  $scope.CloneNetDevice = (Clone)=>{
    $scope.index = $scope.NewNetDevices.indexOf(Clone);
    $scope.NewNetDevices.splice($scope.idnex,0,angular.copy(Clone));
  };

  $scope.RemoveNetDevice = (Clone)=>{
    $scope.index = $scope.NewNetDevices.indexOf(Clone);
    $scope.NewNetDevices.splice($scope.idnex,1);
  };

  //VKAN minipuplate
  $scope.NewVLAN = ()=>{
    $scope.New_VLAN = {};
    $scope.NewVLANs.splice(0,0,$scope.New_VLAN);
  };

  $scope.CloneVLAN = (Clone)=>{
    $scope.index = $scope.NewVLANs.indexOf(Clone);
    $scope.NewVLANs.splice($scope.index,0,angular.copy(Clone));
  };

  $scope.RemoveVLAN = (Clone) => {
    $scope.index = $scope.NewVLANs.indexOf(Clone);
    $scope.NewVLANs.splice($scope.index,1);
  };

});
