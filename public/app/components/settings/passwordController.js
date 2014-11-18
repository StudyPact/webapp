var module = angular.module("studypact");

module.controller("PasswordController", ["$scope", "$resource","UserService", 
  function($scope, $resource, UserService) {

  $scope.loadUser = function(id) {
    $scope.user = UserService.loadUser(id);
  };

  $scope.save = function() {
    var userUpdate = {
      _id:"me",
      password: $scope.user.password,
    };
    $scope.user=UserService.saveUser(userUpdate);
    $scope.user.$promise.then(function(result){
      $scope.success=true;
      $scope.submitted=false;
    });
    $scope.user.$promise.catch(function(error){
      $scope.error=error;
    })
  };

  $scope.loadUser("me");
}]);
