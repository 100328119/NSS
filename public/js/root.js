"use strict";
const nss = angular.module('nss', []).config(($interpolateProvider)=>{
  $interpolateProvider.startSymbol('{[{').endSymbol('}]}');

});
