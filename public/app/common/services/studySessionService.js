angular.module('studypact').factory('StudySessionService', 
  ["$resource", "$log", "$q", "CacheService", "StudyAppService",
  function($resource, $log, $q, CacheService, StudyAppService) {
    var host = clientConfig.host;

    var error_handler = function(err) {
      console.error(err);
    };

    var functions = {
      loadSessions: function() {
        var StudySessions = $resource(host + '/api/studysessions?limit=5');
        var sessions = StudySessions.query();
        var apps = StudyAppService.loadApps();

        var studyAppsDict = {};
        $q.all([
          sessions.$promise,
          apps.$promise
        ]).then(function() {
          console.log("matching up sessions with apps:", sessions,apps)
          _.each(apps, function(studyapp) {
            studyAppsDict[studyapp._id] = studyapp;
          });
          console.log("DICT:",studyAppsDict )
          _.each(sessions, function(session) {
            session.studyapp = studyAppsDict[session.studyapp];
          })
        }, error_handler);
        return sessions;

      }
    };
    return functions;
  }
]);