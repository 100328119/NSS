var nss = angular.module('nss', ['ngRoute',"ngTable"]).config(($interpolateProvider,$routeProvider)=>{
  $interpolateProvider.startSymbol('{[{').endSymbol('}]}');

});
