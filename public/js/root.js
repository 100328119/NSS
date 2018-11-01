"use strict";
const nss = angular.module('nss', ['ngFileUpload']).config(function($interpolateProvider){
  $interpolateProvider.startSymbol('{[{').endSymbol('}]}');
});
