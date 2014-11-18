angular.module('studypact').factory('UserService', 
  ["$resource", "$log", "CacheService", "Config",
  function($resource, $log, CacheService, Config) {
    var host = Config.host;

    var error_handler = function(err) {
      console.error(err);
    };

    var functions = {
      createUser: function(user) {
        $log.debug("Creating User");
        var User = $resource(clientConfig.host + '/api/users');
        return User.save(user).$promise;
      },

      
      deleteUser: function(id) {
        $log.debug("Deleting User:", id);
        var User = $resource(host + '/api/users/' + id);
        var promise = User.delete().$promise;
        promise.then(function(){
          CacheService.delete("user/"+id);
        });
        promise.catch(error_handler);
        return promise
      },

      saveUser: function(userUpdate) {
        var id = userUpdate._id
        $log.debug("Saving User:", id);
        var userData = angular.copy(userUpdate);
        delete userData._id;

        var User = $resource(host + '/api/users/'+ id, null, {
          "update": {
            method: "PUT"
          }
        });
        return CacheService.apply("user/"+id, User.update({}, userData));
      },

      loadUser: function(id) {
        $log.debug("Loading User:", id);
        var User = $resource(host + '/api/users/' + id);
        return CacheService.getAndApply("user/"+id, User.get());
      },

      loadUsers: function() {
        $log.debug("Loading Users");
        var FilteredUsers = $resource(host + '/api/users?fields=_id,displayname,picture');
        return CacheService.getAndApply("users", FilteredUsers.query());
      },

      loadFriendRequests: function() {
        $log.debug("Loading Friend Requests");
        var FriendRequests = $resource(host + '/api/friends?friend_status=incoming_request');
        return CacheService.getAndApply("friendRequests", FriendRequests.query());
      },

      loadFriends: function() {
        $log.debug("Loading Friends");
        var Friends = $resource(host + '/api/friends?friend_status=confirmed');
        return CacheService.getAndApply("friends", Friends.query());
      },

      sendFriendRequest: function(id) {
        $log.debug("Sending Friend Request");
        var Friend = $resource(host + '/api/friends/' + id);
        var savePromise = Friend.save({});
        savePromise.$promise.then(functions.loadUsers);
        savePromise.$promise.then(functions.loadFriendRequests);
        savePromise.$promise.catch(error_handler);
        return savePromise.$promise;
      },

      acceptFriendRequest: function(id) {
        $log.debug("Accepting Friend Request");
        var FriendAccept = $resource(host + '/api/friends/' + id + "/accept");
        var acceptPromise = FriendAccept.get({});
        acceptPromise.$promise.then(functions.loadUsers);
        acceptPromise.$promise.then(functions.loadFriends);
        acceptPromise.$promise.then(functions.loadFriendRequests);
        acceptPromise.$promise.catch(error_handler);
        return acceptPromise.$promise;
      }
    };
    return functions;
  }
]);