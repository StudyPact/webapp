angular.module('studypact').factory('UserService', ["$resource", "$log", "CacheService",
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

      loadUser: function(id) {
        var User = $resource(host + '/api/users/' + id);
        return User.get();
      },

      loadUsers: function() {
        $log.debug("Loading Users");
        var FilteredUsers = $resource(host + '/api/users?fields=_id,displayname,picture');
        //return CacheService.getAndApply("users", FilteredUsers.query());
        return FilteredUsers.query();
      },

      loadFriendRequests: function() {
        $log.debug("Loading Friend Requests");
        var FriendRequests = $resource(host + '/api/friends?friend_status=incoming_request');
        //return CacheService.getAndApply("friendRequests", FriendRequests.query());
        return FriendRequests.query();
      },

      loadFriends: function() {
        $log.debug("Loading Friends");
        var Friends = $resource(host + '/api/friends?friend_status=confirmed');
        //return CacheService.getAndApply("friends", Friends.query());
        return Friends.query();
      },

      sendFriendRequest: function(id) {
        $log.debug("Sending Friend Request");
        var Friend = $resource(host + '/api/friends/' + id);
        var savePromise = Friend.save({});
        savePromise.$promise.then(functions.loadUsers, error_handler);
        return savePromise.$promise;
      },

      acceptFriendRequest: function(id) {
        $log.debug("Accepting Friend Request");
        var FriendAccept = $resource(host + '/api/friends/' + id + "/accept");
        var acceptPromise = FriendAccept.get({});
        acceptPromise.$promise.then(functions.loadUsers, error_handler);
        acceptPromise.$promise.then(functions.loadFriends, error_handler);
        acceptPromise.$promise.then(functions.loadFriendRequests, error_handler);
        return acceptPromise.$promise;
      },

    };
    return functions;
  }
]);