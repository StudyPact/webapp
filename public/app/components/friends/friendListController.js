var module = angular.module("studypact");

module.controller("FriendListController", function ($scope, $resource) {
  var host = clientConfig.host;

  var error_handler = function(err) {
    console.error(err);
    alert(err.data);
  };

  $scope.loadFriendRequests = function() {
    $resource(host + '/api/friends?status=pending').query(
      function(friendRequests) {
        $scope.friendRequests=friendRequests;
        console.log("loaded friendRequests:", friendRequests);

      },
      error_handler);
  };

  $scope.loadFriends = function() {
    $resource(host + '/api/friends?status=confirmed').query(
      function(friends) {
        $scope.friends=friends;
        console.log("loaded friends:", friends);

      },
      error_handler);
  };

  $scope.acceptFriendRequest = function (id) {
      var Friend = $resource(host + '/api/friends/'+id+"/accept");
      Friend.get({}, function(result){
          console.log("Accepted Friend:", id);
      }, 
      error_handler);
  };

  $scope.loadFriendRequests();
  $scope.loadFriends();
});