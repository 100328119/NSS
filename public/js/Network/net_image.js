nss.controller('netImage',['$scope',"$http","$location",'Upload',function($scope, $http, $location ,Upload){
  var url = $location.absUrl().split('/');
  $scope.id = url[5];
  $http.get('/api/Netdata/store_image/'+$scope.id,)
  .then(function successCallback(res){
     $scope.store_images = res.data;
  },function errorCallback(res){
    console.log(res.data);
  });

   $scope.uploadFile = function(){
     if($scope.newImage && $scope.newImage != ''){
       var file = $scope.newImage;
       $scope.upload(file);
     }else{
       console.log("empty object");
     }
   };

   $scope.upload = function (file) {
        Upload.upload({
            url: '/api/Netdata/store_image/'+$scope.id,
            method: 'POST',
            file: file
        }).then(function (resp) {
            $scope.store_images = resp.data;
            $scope.newImage = '';
            angular.element('#NewImageError').collapse("hide");
            angular.element('#uploadimage').modal('hide');
        }, function (resp) {
            angular.element('#NewImageError').collapse("show");
            $scope.newImage = '';
            console.log('Error status: ' + resp.status);
        })
    };

    $scope.selectImage = function(image){
       $scope.selectedItem = angular.copy(image);
    }

    //delete
    $scope.deletImage = function(){
      $http.put('/api/Netdata/delete_store_image/'+$scope.id,$scope.selectedItem )
        .then(function successCallback(res){
           $scope.selectedItem = "";
           $scope.store_images = res.data;
           angular.element('#deleteImage').collapse("hide");
        }, function errorCallback(res){
           console.log(res.data);
        })
    }

}]);
