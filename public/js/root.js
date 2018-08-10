var nss = angular.module('nss', []).config(($interpolateProvider)=>{
  $interpolateProvider.startSymbol('{[{').endSymbol('}]}');
});
