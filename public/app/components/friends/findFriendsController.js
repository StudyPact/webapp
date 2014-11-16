var module = angular.module("studypact");

module.controller("FindFriendsController", function ($scope, $resource) {
  var host = clientConfig.host;

  var error_handler = function(err) {
    console.error(err);
    alert(err.data);
  };

  $scope.loadUsers = function() {
    $scope.users = $resource(host + '/api/users?fields=_id,displayname,picture').query(
      function(users) {
        console.log("successfully loaded all users:", users);
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

  $scope.acceptFriendRequest = function (id) {
      var Friend = $resource(host + '/api/friends/'+id+"/accept");
      Friend.get({}, function(result){
          console.log("Accepted Friend:", id);
          $scope.loadUsers();
      }, 
      error_handler);
  };

  $scope.loadUsers();

});