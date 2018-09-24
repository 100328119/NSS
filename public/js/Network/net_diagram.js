nss.controller("diagram", function($scope, $http,$location,$window,$filter){
   	$scope.Network = {};
    var DIR = '/img/';
    var EDGE_LENGTH_MAIN = 150;
    var EDGE_LENGTH_SUB = 50;
    $scope.DiagramInit = function(){
        // loading.modal('show');
        var url = $location.absUrl().split('/');
        $scope.id = url[4];
        $http.get('/api/Netdata/Site/'+$scope.id)
          .then(function(response){
            $scope.Network = angular.copy(response.data);
            console.log(response.data);
              $scope.loadDiagram();
        });
        //get vlan Information
        $http.get('/api/Netdata/vlan')
          .then(function successCallback(res){
            console.log(res.data);
            $scope.vlans = angular.copy(res.data);
          }, function errorCallback(res){
            console.log(res.data);
          });


        };

    $scope.loadDiagram = function(){
      // Create a data table with nodes.
     $scope.nodes = [];
     // Create a data table with links.
     $scope.edges = [];
     for(var i = 0; i < $scope.Network.WANs.length;  i++ ){
       $scope.nodes.push({id:$scope.Network.WANs[i].Provider, label:$scope.Network.WANs[i].Provider+' '+$scope.Network.WANs[i].WAN_IP, image: DIR + 'wan.png', shape: 'image'});
     }
     for(var i = 0; i < $scope.Network.Net_devices.length;  i++ ){
       if($scope.Network.Net_devices[i].type == 'Router'){
         $scope.nodes.push({id:$scope.Network.Net_devices[i].name, label:$scope.Network.Net_devices[i].name+' '+$scope.Network.Net_devices[i].Loopback, image: DIR + 'router.png', shape: 'image'});
         if($scope.Network.Net_devices[i].Connect_Device == ""){
           for(var j = 0; j < $scope.Network.WANs.length;  j++ ){
              $scope.edges.push({from: $scope.Network.Net_devices[i].name, to: $scope.Network.WANs[j].Provider, length: EDGE_LENGTH_MAIN});
           }
         }else{
           $scope.edges.push({from: $scope.Network.Net_devices[i].name, to: $scope.Network.Net_devices[i].Connect_Device, length: EDGE_LENGTH_MAIN});
         }
       }else{
         $scope.nodes.push({id:$scope.Network.Net_devices[i].name, label:$scope.Network.Net_devices[i].name+' '+$scope.Network.Net_devices[i].Loopback, image: DIR + 'switch.png', shape: 'image'});
         $scope.edges.push({from: $scope.Network.Net_devices[i].name, to: $scope.Network.Net_devices[i].Connect_Device, length: EDGE_LENGTH_MAIN});
         }
       }
     console.log($scope.nodes);
     // create a network
     $scope.container = document.getElementById('mynetwork');
     $scope.data = {
       nodes: $scope.nodes,
       edges: $scope.edges
     };
     console.log($scope.data);
     $scope.options = {};
     $scope.network = new vis.Network($scope.container, $scope.data, $scope.options);
    }
})
