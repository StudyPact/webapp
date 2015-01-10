angular.module('studypact').factory('StudyAppService', 
  ["$resource", "$log", "CacheService", "Config",
  function($resource, $log, CacheService, Config) {
    var host = Config.host;

    var functions = {
      loadApps: function() {
        var studyapps = CacheService.get("studyapps");
        if (studyapps)
          return studyapps;
        else{
          var StudyApps = $resource(host + '/api/studyapps');
          return CacheService.getAndApply("studyapps", StudyApps.query());
        }
      }
    };
    return functions;
  }
]);