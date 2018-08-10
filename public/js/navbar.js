var navbar = angular.module("navbar", []).config(function($interpolateProvider){
 $interpolateProvider.startSymbol('{[{').endSymbol('}]}');
});

navbar.controller("NavController", function($scope, $http){
  $scope.networks = [];
  $scope.search_net = "";

  $http.get('/api/Netdata/all')
    .then(function(res){
      $scope.networks = angular.copy(res.data);
      console.log($scope.networks);
    });
});
