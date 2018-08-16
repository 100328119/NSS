var nss = angular.module('nss', ['ngRoute']).config(($interpolateProvider,$routeProvider)=>{
  $interpolateProvider.startSymbol('{[{').endSymbol('}]}');

});
