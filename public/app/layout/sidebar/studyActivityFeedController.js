var module = angular.module("studypact");

module.controller("StudyActivityFeedController", ["$scope", "$resource", "StudySessionService",
  function($scope, $resource, StudySessionService) {

    $scope.loadSessions = function() {
      $scope.studySessions = StudySessionService.loadSessions();
    }

    $scope.loadSessions();
  }
]);