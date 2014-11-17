angular.module('studypact').factory('StudyAppService', ["$resource", "$log", "CacheService",
  function($resource, $log, CacheService) {
    var host = clientConfig.host;

    var functions = {
      loadApps: function() {
        var StudyApps = $resource(host + '/api/studyapps');
        return StudyApps.query();
      }
    };
    return functions;
  }
]);