
nss.controller("dashController", function($scope,$http,$window){
  $scope.vlantable = angular.element('#VlanTable');
  $http.get('/api/Netdata/networkinfor')
    .then(function(response){
      $scope.Networks = angular.copy(response.data);
    }).finally(function(){
      angular.element(document).ready(function () {
          angular.element('#NetTable').DataTable({
          "order": [[ 0, "asc" ]],
          "columnDefs": [
                { "type": "numeric-comma", targets: 0 }
            ]
           });
        });
    });

    $http.get('/api/Netdata/vlan')
      .then(function successCallback(res){
        console.log(res.data);
        $scope.vlans = angular.copy(res.data);
        angular.element(document).ready(function () {
          angular.element('#VlanTable').DataTable({
          "order": [[ 0, "asc" ]],
          "columnDefs": [
                { "type": "numeric-comma", targets: 0 }
            ]
           });
        });
      }, function errorCallback(res){
        console.log(res.data);
      });

    $http.get('/api/Netdata/category')
      .then(function(response){
        $scope.Cates = angular.copy(response.data);
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
      // vlan function
      $scope.selectVlan = function(vlan){
        $scope.selectedItem = angular.copy(vlan);
      };

      $scope.addVlan = function(){
         $http.post('/api/Netdata/NewVlan',$scope.newVlan)
          .then(function successCallback(res){
            angular.element('#VlanTable').DataTable().destroy();
            $scope.vlans = angular.copy(res.data);
            angular.element(document).ready(function () {
              angular.element('#VlanTable').DataTable({
                "order": [[ 0, "asc" ]],
                "columnDefs": [
                      { "type": "numeric-comma", targets: 0 }
                  ]
                });
            });
            $scope.newVlan = {};
          }, function errorCallback(res){
            console.log(res);
          });
      }

      $scope.editVlan = function(){
          $http.put('/api/Netdata/UpdataVlan', $scope.selectedItem)
            .then(function successCallback(res){
                angular.element('#VlanTable').DataTable().destroy();
                $scope.vlans = angular.copy(res.data);
                angular.element(document).ready(function () {
                  angular.element('#VlanTable').DataTable({
                    "order": [[ 0, "asc" ]],
                    "columnDefs": [
                          { "type": "numeric-comma", targets: 0 }
                      ]
                    });
                });
                $scope.selectedItem = {};
            }, function errorCallback(res){
                console.log(res);
            });
        };

      //Category Function
    $scope.selectCate = function(cate){
        $scope.selectedItem = angular.copy(cate);
    };

    $scope.addCate = function(){
      console.log("add new cate");
       $http.post('/api/Netdata/NewCategory',$scope.newCate)
        .then(function successCallback(res){
           angular.element('#CateTable').DataTable().destroy();
           $scope.Cates = angular.copy(res.data);
           angular.element(document).ready(function () {
             angular.element('#CateTable').DataTable();
           });
           $scope.newCate = {};
        }, function errorCallback(res){
          console.log(res);
        });
    }

    $scope.editCate = function(){
          $http.put('/api/Netdata/UpdateCate', $scope.selectedItem)
            .then(function successCallback(res){
                $scope.Cates = angular.copy(res.data);
                angular.element('#CateTable').DataTable().destroy();
                $scope.Cates = angular.copy(res.data);
                angular.element(document).ready(function () {
                  angular.element('#CateTable').DataTable();
                });
            }, function errorCallback(res){
                console.log(res);
            });
    };


});
