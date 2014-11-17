angular.module('studypact').factory('PactService', ["$resource", "$log", "CacheService",
  function($resource, $log, CacheService) {
    var host = clientConfig.host;

    var error_handler = function(err) {
      console.error(err);
    };

    var functions = {
      loadPact: function () {
        var Pact = $resource(host + '/api/pacts/current/');
        return Pact.get();
      }
    };
    return functions;
  }
]);