nss.controller("ToolController", function($scope,$http,$window){
  $http.get('/api/tooldata/all')
  .then(function successCallback(res){
    $scope.Tools = angular.copy(res.data);
    angular.element(document).ready(function () {
      angular.element('#toolTable').DataTable(
        {
            aLengthMenu: [[10, 25, 50,100, -1], [10, 25, 50,100, "All"]],
            iDisplayLength: 50
        }
      );
    });
  }, function errorCallback(res){
    console.log(res.data);
  });

  $scope.selectItem = function(SelectedItem){
    $scope.selectedItem = angular.copy(SelectedItem);
  };

  $scope.addTool = function(){
    $http.post('/api/tooldata/new', $scope.newTool)
    .then(function successCallback(res){
      angular.element('#toolTable').DataTable().destroy();
      $scope.Tools = angular.copy(res.data);
      angular.element(document).ready(function () {
        angular.element('#toolTable').DataTable(
          {
              aLengthMenu: [[10, 25, 50,100, -1], [10, 25, 50,100, "All"]],
              iDisplayLength: 50
          }
        );
      });
    }, function errorCallback(res){
      console.log(res.data);
    });
     $scope.newTool = {};
  }

  $scope.editTool = function(){
    $http.put('/api/tooldata/update/'+$scope.selectedItem.id, $scope.selectedItem)
    .then(function successCallback(res){
      $scope.Tools = angular.copy(res.data);
      angular.element('#toolTable').DataTable().destroy();
      angular.element(document).ready(function () {
        angular.element('#toolTable').DataTable({
              aLengthMenu: [[10, 25, 50,100, -1], [10, 25, 50,100, "All"]],
              iDisplayLength: 50
           });
      });
    }, function errorCallback(res){
      console.log(res.data);
    });
    $scope.selectedItem = {};
  }

  $scope.deleteNet =function(){
    $http.delete('/api/tooldata/delete/'+$scope.selectedItem.id)
    .then(function successCallback(res){
      angular.element('#toolTable').DataTable().destroy();
      $scope.Tools = angular.copy(res.data);
      angular.element(document).ready(function () {
        angular.element('#toolTable').DataTable({
              aLengthMenu: [[10, 25, 50,100, -1], [10, 25, 50,100, "All"]],
              iDisplayLength: 50
           });
      });
    }, function errorCallback(res){
      console.log(res.data);
    });
    $scope.selectedItem = {};
  }
});
