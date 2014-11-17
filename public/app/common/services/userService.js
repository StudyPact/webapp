angular.module('studypact').factory('UserService', ["$resource","CacheService", 
  function($resource, CacheService) {
  var host = clientConfig.host;
  var FilteredUsers = $resource(host + '/api/users?fields=_id,displayname,picture');
  var cache;

  return {
    createUser: function(user) {
      var User = $resource(clientConfig.host + '/api/users');
      return User.save(user).$promise;
    },

    loadUsers: function() {

      var users = FilteredUsers.query();
      
      var cacheAdded = CacheService.applyCacheToResource(users, cache);
      cache = users;
      return cacheAdded;
    }
  }
}]);
