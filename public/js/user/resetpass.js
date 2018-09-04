const nss = angular.module('nss', []).config(($interpolateProvider)=>{
  $interpolateProvider.startSymbol('{[{').endSymbol('}]}');
});
nss.controller("resetpass", function($scope,$http,$location,$window){
  $scope.data = {};
  $scope.Submit = function(){
    if($scope.Newpass === $scope.ConfirmPass & $scope.ConfirmPass != undefined & $scope.ConfirmPass != "" & $scope.Newpass != $scope.oldpass){
      $scope.data.oldpass = $scope.oldpass;
      $scope.data.password = $scope.ConfirmPass;
      $http.put('/secure/resetpass',$scope.data)
      .then(function successCallback(response){
         $window.location.href = '/login';
      },function errorCallback(response){
          console.log(response);
          $scope.Newpass ='';
          $scope.ConfirmPass ='';
          $scope.oldpass = '';
          angular.element('#resetError').collapse("show");
      });
    }else{
      angular.element('#PassError').collapse("show");
      $scope.Newpass ='';
      $scope.ConfirmPass ='';
      $scope.oldpass = '';
    }
  }

 $scope.Cancel = function(){
   $window.location.href = '/dashboard';
 }
})
