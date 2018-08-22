
nss.controller("dashController", function($scope,$http,$window,NgTableParams){
  console.log("dashController");

  $scope.vlantable = angular.element('#VlanTable');
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
        // $scope.VlanTable = new NgTableParams({}, { dataset: $scope.vlans});
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
      };

      $scope.selectVlan = function(vlan){
        $scope.selectedItem = angular.copy(vlan);
        $scope.currentIndex = $scope.vlans.indexOf(vlan);
        console.log($scope.selectedItem);
      };

      $scope.editVlan = function(){
          $http.put('/api/Netdata/UpdataVlan', $scope.selectedItem)
            .then(function successCallback(res){
                $scope.vlans = angular.copy(res.data);
            }, function errorCallback(res){
                console.log(res);
            });
        };

    // vlan function
    $scope.addCate = function(){
       $http.post('/api/Netdata/NewCategory',$scope.newCate)
        .then(function successCallback(res){
           $scope.Cates = res.data;
        }, function errorCallback(res){
          console.log(res);
        });
    }

    $scope.selectCate = function(cate){
        $scope.selectedItem = angular.copy(cate);
    };

    $scope.editCate = function(){
          $http.put('/api/Netdata/UpdateCate', $scope.selectedItem)
            .then(function successCallback(res){
                $scope.Cates = angular.copy(res.data);
            }, function errorCallback(res){
                console.log(res);
            });
    };


});
