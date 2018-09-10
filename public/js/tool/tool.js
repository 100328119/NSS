nss.controller("ToolController", function($scope,$http,$window){
  $http.get('/api/tooldata/all')
  .then(function successCallback(res){
    $scope.Tools = angular.copy(res.data);
    angular.element(document).ready(function () {
      angular.element('#toolTable').DataTable();
    });
  }, function errorCallback(res){
    console.log(res.data);
  });

  $scope.selectItem = function(SelectedItem){
    $scope.selectedItem = angular.copy(SelectedItem);
    console.log(SelectedItem);
  };

  $scope.addTool = function(){
    $http.post('/api/tooldata/new', $scope.newTool)
    .then(function successCallback(res){
      $scope.Tools = angular.copy(res.data);
    }, function errorCallback(res){
      console.log(res.data);
    });
     $scope.newTool = {};
  }

  $scope.editTool = function(){
    $http.put('/api/tooldata/update/'+$scope.selectedItem.id, $scope.selectedItem)
    .then(function successCallback(res){
      $scope.Tools = angular.copy(res.data);
    }, function errorCallback(res){
      console.log(res.data);
    });
    $scope.selectedItem = {};
  }

  $scope.deleteNet =function(){
    $http.delete('/api/tooldata/delete/'+$scope.selectedItem.id)
    .then(function successCallback(res){
      $scope.Tools = angular.copy(res.data);
    }, function errorCallback(res){
      console.log(res.data);
    });
    $scope.selectedItem = {};
  }
});
