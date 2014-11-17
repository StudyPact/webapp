var module = angular.module("studypact");

module.controller("FindFriendsController", ["$scope", "$resource", "UserService", function($scope, $resource, UserService) {
  $scope.loadUsers = function() {
    $scope.users = UserService.loadUsers();
  };

  $scope.sendFriendRequest = function(id) {
    UserService.sendFriendRequest(id);
  };

  $scope.acceptFriendRequest = function(id) {
    UserService.acceptFriendRequest(id);
  };

  $scope.loadUsers();

}]);