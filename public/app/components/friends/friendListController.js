var module = angular.module("studypact");

module.controller("FriendListController", ["$scope", "$resource","UserService",function ($scope, $resource, UserService) {
  var host = clientConfig.host;

  $scope.loadFriendRequests = function() {
    $scope.friendRequests = UserService.loadFriendRequests();
  };

  $scope.acceptFriendRequest = function (id) {
    UserService.acceptFriendRequest(id);
  };

  $scope.loadFriends = function() {
    $scope.friends = UserService.loadFriends();
  };

  $scope.loadFriendRequests();
  $scope.loadFriends();
}]);