var module = angular.module("studypact");

module.controller("StudyActivityFeedController", function ($scope, $resource) {
  var host = clientConfig.host;

  var error_handler = function(err) {
    console.error(err);
    alert(err.data);
  };

  $scope.loadSessions = function() {
    $resource(host + '/api/studysessions?limit=5').query(
      function(studySessions) {
        $scope.studySessions=_.map(studySessions, function(studySession){
          var o=studySession;
          o.studyapp = $scope.studyApps[studySession.studyapp];
          return o;
        })
        

      },
      error_handler);
  };

  $scope.loadApps = function() {
    $resource(host + '/api/studyapps').query(
      function(studyapps) {
        $scope.studyApps={};
        _.each(studyapps, function(studyapp){
          $scope.studyApps[studyapp._id]=studyapp;
        });
        $scope.loadSessions();
      },
      error_handler);
  };
  $scope.loadApps();
});