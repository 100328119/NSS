var NewSite = angular.module('NewSite', []).config(($interpolateProvider)=>{
  $interpolateProvider.startSymbol('{[{').endSymbol('}]}');
});

NewSite.controller("NewSiteController",($scope,$http)=>{
  $scope.NewSite = {};
  $scope.End_Device = [];
  //New End Device Setup
  $scope.getTemplate = ()=>{
    $http.get('/api/Netdata/template/BCCS')
      .then((response)=>{
        $scope.NewSite = angular.copy(response.data);
    });
  };

  $scope.SaveNewSite = ()=>{
    console.log($scope.NewSite);
    $http.post('/api/Netdata/new', $scope.NewSite)
      .then( function successCallback(response){
          console.log(response);
      }, function errorCallback(response){
          console.log(response);
      });
  }
  //END device minipuplate
  $scope.NewEndDevice = ()=>{
    $scope.NewNet =  {};
    $scope.End_Device.splice(0,0,$scope.NewNet);
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
    $scope.NewWAN = {}
    $scope.NewSite.WAN.splice(0,0,angular.copy(Clone));
  };

  $scope.CloneWAN = (Clone)=>{
    $scope.index = $scope.NewSite.WAN.indexOf(Clone);
    $scope.NewSite.WAN.splice($scope.index, 0 , angular.copy(Clone));
  };

  $scope.RemoveWAN = (Clone)=>{
    $scope.index = $scope.NewSite.WAN.indexOf(Clone);
    $scope.NewSite.WAN.splice($scope.index, 1 );
  }

  //Net_Device minipuplate
  $scope.NewNetDevice = ()=>{
    $scope.NewNetDevice = {};
    $scope.NewSite.Net_Device.splice(0,0,angular.copy(Clone));
  };

  $scope.CloneNetDevice = (Clone)=>{
    $scope.index = $scope.NewSite.Net_Device.indexOf(Clone);
    $scope.NewSite.Net_Device.splice($scope.idnex,0,angular.copy(Clone));
  };

  $scope.RemoveNetDevice = (Clone)=>{
    $scope.index = $scope.NewSite.Net_Device.indexOf(Clone);
    $scope.NewSite.Net_Device.splice($scope.idnex,1);
  };

  //VKAN minipuplate
  $scope.NewVLAN = ()=>{
    $scope.NewVLAN = {};
    $scope.NetSite.Net_Device.splice(0,0,$scope.NewVLAN);
  };

  $scope.CloneVLAN = (Clone)=>{
    $scope.index = $scope.NewSite.VLANs.indexOf(Clone);
    $scope.NetSite.VLANs.splice($scope.index,0,Clone);
  }

  $scope.RemoveVLAN = (Clone) => {
    $scope.index = $scope.NewSite.VLANs.indexOf(Clone);
    $scope.NetSite.VLANs.splice($scope.index,1);
  }
});
