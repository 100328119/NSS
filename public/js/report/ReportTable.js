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

  $scope.selectReport = function(repo){
    $scope.selectedReport = angular.copy(repo);
  };

  $scope.newRepo = function(){
    $window.location.href = '/newreport';
  }

  $scope.deleteRepo = function(){
    console.log($scope.selectedReport);
    $http.put('/api/reportdata/delete/'+$scope.selectedReport.id,$scope.selectedReport)
    .then(function successCallback(res){
      $scope.Reports = angular.copy(res.data);
      // angular.element('#repoTable').DataTable().clear().draw();
    }, function errorCallback(res){
      console.log(res.data);
    });
  }
})
