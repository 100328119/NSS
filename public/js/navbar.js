// var navbar = angular.module("navbar", []).config(function($interpolateProvider){
//  $interpolateProvider.startSymbol('{[{').endSymbol('}]}');
// });
"use strict";
nss.controller("NavController", function($scope, $http){
  $scope.networks = [];
  $scope.search_net = "";
  $scope.reports = [];
  $http.get('/api/Netdata/all')
    .then(function(res){
      $scope.networks = angular.copy(res.data);
    });

    $http.get('/api/reportdata/all')
    .then(function successCallback(res){
      $scope.reports = angular.copy(res.data);
    }, function errorCallback(res){
      console.log(res.data);
    });
});
