angular.module('studypact').factory('StudySessionService', 
  ["$resource", "$log", "$q", "CacheService", "StudyAppService", "Config",
  function($resource, $log, $q, CacheService, StudyAppService, Config) {
    var host = Config.host;

    var error_handler = function(err) {
      console.error(err);
    };

    var addAppsToSessions = function(sessions, apps) {
      var studyAppsDict = {};
      $q.all([
        sessions.$promise,
        apps.$promise
      ]).then(function() {
        _.each(apps, function(studyapp) {
          studyAppsDict[studyapp._id] = studyapp;
        });
        _.each(sessions, function(session) {
          session.studyapp = studyAppsDict[session.studyapp];
        })
      }, error_handler);
    };

    return {
      loadSessions: function() {
        var StudySessions = $resource(host + '/api/studysessions?limit=5');
        var sessions = CacheService.getAndApply("studysessions", StudySessions.query());
        var apps = StudyAppService.loadApps();

        addAppsToSessions(sessions, apps);
        
        return sessions;

      }
    };
  }
]);