var module = angular.module("studypact");

module.controller("DeleteController", 
  ["$scope", "$state", "$resource","UserService", "AuthenticationService",
  function($scope, $state, $resource, UserService, AuthenticationService) {

  $scope.delete = function() {
    var promise = UserService.deleteUser("me");
    promise.then(function(result){
      console.log("logout from delete controller");
      AuthenticationService.logout();
      $state.go("loggedOut");
    });
    promise.catch(function(error){
      $scope.error=error;
    })
  };
}]);
