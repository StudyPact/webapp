var module = angular.module("studypact");

module.controller("FindFriendsController", ["$scope", "$resource", "UserService", function ($scope, $resource, UserService) {
  var host = clientConfig.host;

  var error_handler = function(err) {
    console.error(err);
    alert(err.data);
  };

  $scope.loadUsers = function() {
    $scope.users = UserService.loadUsers();
    $scope.users.$promise.then(
      function(users) {
        console.log("successfully loaded all users:", users);
      },error_handler);
  };

  $scope.sendFriendRequest = function (id) {
      var Friend = $resource(host + '/api/friends/'+id);
      Friend.save({}, function(result){
          console.log("Requested friend:", id);
          $scope.loadUsers();
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

}]);