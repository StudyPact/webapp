var module = angular.module("studypact");

module.controller("ProfileController", ["$scope", "UserService", function($scope, UserService) {
  $scope.loadUser = function(id) {
    $scope.user = UserService.loadUser(id);
  };
}]);