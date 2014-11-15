var module = angular.module("studypact");

module.controller("FindFriendsController", function ($scope, $resource) {
  var host = clientConfig.host;

  var error_handler = function(err) {
    console.error(err);
    alert(err.data);
  };

  $scope.loadUsers = function() {
    $scope.users = $resource(host + '/api/users?fields=_id,displayname,picture').query(
      function(friends) {
        console.log("successfully loaded friends!");
      },
      error_handler);
  };


  $scope.sendFriendRequest = function (id) {
      var Friend = $resource(host + '/api/friends/'+id);
      Friend.save({}, function(result){
          console.log("Requested friend:", id);
      }, 
      error_handler);
  };

  $scope.loadUsers();

});