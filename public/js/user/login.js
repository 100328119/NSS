const nss = angular.module('nss', []).config(function($interpolateProvider){
  $interpolateProvider.startSymbol('{[{').endSymbol('}]}');
});
nss.controller("login", function($scope,$window){
 $scope.Cancel = function(){
   $window.location.href = '/dashboard';
 }
})
