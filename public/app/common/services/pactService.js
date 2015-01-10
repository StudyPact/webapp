angular.module('studypact').factory('PactService', 
  ["$resource", "$log", "CacheService", "Config",
  function($resource, $log, CacheService, Config) {
    var host = Config.host;

    var functions = {
      loadPact: function () {
        var Pact = $resource(host + '/api/pacts/current/');
        return CacheService.getAndApply("pacts/current", Pact.get());
      }
    };
    return functions;
  }
]);