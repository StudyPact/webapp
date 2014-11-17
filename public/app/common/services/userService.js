angular.module('studypact').factory('UserService', ["$resource","$log","CacheService", 
  function($resource, $log, CacheService) {
  var host = clientConfig.host;

  var error_handler = function(err) {
    console.error(err);
  };

  var functions = {
    createUser: function(user) {
      var User = $resource(clientConfig.host + '/api/users');
      return User.save(user).$promise;
    },

    loadUsers: function() {
      $log.debug("Loading Users");
      var FilteredUsers = $resource(host + '/api/users?fields=_id,displayname,picture');
      var users = FilteredUsers.query();
      return CacheService.getAndApply("users", users);
    },

    sendFriendRequest: function (id) {
      $log.debug("Sending Friend Request");
      var Friend = $resource(host + '/api/friends/'+id);
      var savePromise = Friend.save({});
      savePromise.$promise.then(functions.loadUsers, error_handler);
      return savePromise.$promise;
    },

    acceptFriendRequest: function (id) {
      $log.debug("Accepting Friend Request");
      var FriendAccept = $resource(host + '/api/friends/'+id+"/accept");
      var acceptPromise = Friend.get({});
      acceptPromise.$promise.then(functions.loadUsers, error_handler);
      return acceptPromise.$promise;
    },
  };
  return functions;
}]);
