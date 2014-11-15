var module = angular.module("studypact");

module.controller("FindFriendsController", function ($scope, $resource) {
  var host = clientConfig.host;

  var error_handler = function(err) {
    console.error(err);
    alert(err.data);
  };

  $scope.loadFriends = function() {
    $scope.friends = $resource(host + '/api/users?fields=_id,displayname,picture').query(
      function(friends) {
        console.log("successfully loaded friends!");
      },
      error_handler);
  };

  $scope.loadFriends();

});