var module = angular.module("studypact");

module.controller("StudyActivityFeedController", function ($scope, $resource) {
  var host = clientConfig.host;

  var error_handler = function(err) {
    console.error(err);
    alert(err.data);
  };

  $scope.loadSessions = function() {
    $scope.studySessions = $resource(host + '/api/studysessions?limit=5').query(
      function(result) {
        console.log("LOADED sessions", result);
      },
      error_handler);
  };

  $scope.loadSessions();

});