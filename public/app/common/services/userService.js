angular.module('studypact').factory('UserService', ["$state","$resource", "$rootScope", "$q",
  function($state, $resource, $rootScope, $q) {

    return {
      createUser: function(user) {
        var User = $resource(clientConfig.host + '/api/users');

        return User.save(user).$promise;
      },
      deleteUser: function() {

      },
      updateUser: function(user) {

      },
      loadUser: function() {

      }
    }
  }]);