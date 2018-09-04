"use strict";
const nss = angular.module('nss', []).config(function($interpolateProvider){
  $interpolateProvider.startSymbol('{[{').endSymbol('}]}');

});
