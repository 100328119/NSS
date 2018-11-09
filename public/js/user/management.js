nss.controller("UserManagment", function($scope,$http,$location,$window){
  $scope.NewUser = {};
  $http.get("/secure/users")
  .then(function successCallback(res){
    console.log(res.data);
    $scope.users = angular.copy(res.data);
    angular.element(document).ready(function () {
      angular.element('#userTable').DataTable();
    });
  }, function errorCallback(res){
    console.log(res.data);
  });

  $http.get("/secure/admin")
  .then(function successCallback(res){
    console.log(res.data);
    $scope.admins = angular.copy(res.data);
  }, function errorCallback(res){
    console.log(res.data);
  });

  $scope.selectUser = function(user){
    $scope.selectedItem = angular.copy(user);
    $scope.selectadmin_id = angular.copy(user.admin_id);
  };

  $scope.saveUser = function(){
    $scope.selectedItem.admin_id = angular.copy($scope.selectadmin_id);
    delete $scope.selectedItem.type;
    console.log($scope.selectedItem);
    $http.put('/secure/updateuser/'+$scope.selectedItem.id ,$scope.selectedItem)
    .then(function successCallback(response){
       $scope.users = angular.copy(response.data);
    },function errorCallback(response){
        console.log(response);
    });
  };

  $scope.updatePass = function(){
    if($scope.Newpass === $scope.ConfirmPass & $scope.ConfirmPass != undefined & $scope.ConfirmPass != ""){
      delete $scope.selectedItem.type;
      $scope.selectedItem.password = $scope.ConfirmPass;
      $http.put('/secure/updatepass/'+$scope.selectedItem.id ,$scope.selectedItem)
      .then(function successCallback(response){
         angular.element('#PassSuccess').collapse("show");
         angular.element('#PassError').collapse("hide");
         angular.element('#Password').modal('hide');
         $scope.Newpass = "";
         $scope.ConfirmPass = "";
         $scope.updatedUser = response.config.data.email;
      },function errorCallback(response){
          console.log(response);
      });
    }else{
      angular.element('#PassError').collapse("show");
      $scope.Newpass = "";
      $scope.ConfirmPass = "";
    }
  };

  $scope.ActivateUser = function(){
    if($scope.selectedItem.status == 1){
      $scope.selectedItem.status = 0;
    }else{
      $scope.selectedItem.status = 1;
    }
    delete $scope.selectedItem.type;
    console.log($scope.selectedItem);
    $http.put('/secure/updateuser/'+$scope.selectedItem.id ,$scope.selectedItem)
    .then(function successCallback(response){
       $scope.users = angular.copy(response.data);
    },function errorCallback(response){
        console.log(response);
    });
  };

  $scope.newUser = function(){
      if($scope.NewPassword === $scope.ConfirmPassord & $scope.ConfirmPassord != undefined & $scope.ConfirmPassord != "" & $scope.NewUserEmail != undefined & $scope.NewUserEmail != ""& $scope.NewUseradmin_id != undefined & $scope.NewUseradmin_id != ""){
        $scope.NewUser.email = $scope.NewUserEmail;
        $scope.NewUser.password = $scope.ConfirmPassord;
        $scope.NewUser.admin_id = $scope.NewUseradmin_id;
        $http.post('/secure/newadmin' ,$scope.NewUser)
        .then(function successCallback(response){
           $scope.users = angular.copy(response.data);
           console.log(response);
           angular.element('#NewUserError').collapse("hide");
           // angular.element('#DuplicateUser').collapse("hide");
           angular.element('#NewUser').modal('hide');
           $scope.NewUserEmail = '';
           $scope.NewUseradmin_id = '';
           $scope.NewPassword = '';
           $scope.ConfirmPassord = '';
        },function errorCallback(response){
          angular.element('#DuplicateUser').collapse("show");
          angular.element('#NewUser').modal('hide');
          $scope.NewUserEmail = '';
          $scope.NewUseradmin_id = '';
          $scope.NewPassword = '';
          $scope.ConfirmPassord = '';
        });
      }else{
        angular.element('#NewUserError').collapse("show");
        $scope.NewUserEmail = '';
        $scope.NewUseradmin_id = '';
        $scope.NewPassword = '';
        $scope.ConfirmPassord = '';
    }
  }
})
