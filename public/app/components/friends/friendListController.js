var module = angular.module("studypact");

module.controller("FriendListController", function ($scope, $resource) {
  var host = clientConfig.host;

  var error_handler = function(err) {
    console.error(err);
    alert(err.data);
  };

  $scope.loadFriends = function() {
    $scope.friends = $resource(host + '/api/friends').query(
      function(friends) {
        console.log("successfully loaded friends!");
      },
      error_handler);
  };

  $scope.loadFriends();

});