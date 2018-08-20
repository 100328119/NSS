
nss.controller("dashController", function($scope,$http,$window){
  console.log("dashController");

  $http.get('/api/Netdata/networkinfor')
    .then(function(response){
      $scope.Networks = angular.copy(response.data);
      console.log($scope.Networks);
    }).finally(function(){
      angular.element(document).ready(function () {
        angular.element('#NetTable').DataTable();
        });
    });;

    $http.get('/api/Netdata/vlan')
      .then(function successCallback(res){
        console.log(res.data);
        $scope.vlans = angular.copy(res.data);
        angular.element(document).ready(function () {
          angular.element('#VlanTable').DataTable();
        });
      }, function errorCallback(res){
        console.log(res.data);
      });
      
    $http.get('/api/Netdata/category')
      .then(function(response){
        $scope.Cates = angular.copy(response.data);
        console.log($scope.Cates);
        angular.element(document).ready(function () {
          angular.element('#CateTable').DataTable();
          });
      });

      $http.get('/api/Netdata/NetCategoryGroup')
        .then(function successCallback(res){
          console.log(res.data);
          $scope.BuildChart(res.data);
        }, function errorCallback(err){
           console.log(err);
        });

      $scope.NetClick = function(Net){
        $window.location.href = '/Network/'+Net.id;
      };

      $scope.BuildChart = function(CateData){
       console.log(CateData)
       new Morris.Donut({
          element: 'NetChart',
          data:CateData
          });
      }
});
