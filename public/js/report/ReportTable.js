nss.controller("ReportTableContoller", function($scope,$http,$location,$window){
  $http.get("/api/reportdata/all")
  .then(function successCallback(res){
    console.log(res.data);
    $scope.Reports = angular.copy(res.data);
    angular.element(document).ready(function () {
      angular.element('#repoTable').DataTable();
    });
  }, function errorCallback(res){
    console.log(res.data);
  });

  $scope.RepoClick = function(Net){
    $window.location.href = '/report/'+Net.id;
  };
})
