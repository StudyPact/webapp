var module = angular.module("studypact");
HOUR = 60;
MAX_HOURS = 10;
MIN_HOURS = 1;

STAKES_INCREMENT = 5;
MAX_STAKES = 50;
MIN_STAKES = 5;

module.controller("NextWeekPactController", ["$scope", "$resource","UserService", 
  function($scope, $resource, UserService) {

  $scope.loadUser = function(id) {
    $scope.user = UserService.loadUser(id);
  };

  $scope.save = function() {
    var userUpdate = {
      _id:"me",
      pact_stakes: $scope.user.pact_stakes,
      pact_duration: $scope.user.pact_duration
    };
    $scope.user=UserService.saveUser(userUpdate);
  };

  $scope.loadUser("me");

  $scope.increaseHours = function() {
    $scope.user.pact_duration += HOUR;
    if ($scope.user.pact_duration>HOUR * MAX_HOURS)
      $scope.user.pact_duration = HOUR * MAX_HOURS;
  }

  $scope.decreaseHours = function() {
    $scope.user.pact_duration -= HOUR;
    if ($scope.user.pact_duration < HOUR * MIN_HOURS)
      $scope.user.pact_duration = HOUR * MIN_HOURS;
  }

  $scope.increaseStakes = function() {
    $scope.user.pact_stakes+= STAKES_INCREMENT;
    if ($scope.user.pact_stakes> MAX_STAKES)
      $scope.user.pact_stakes = MAX_STAKES;
  }

  $scope.decreaseStakes = function() {
    $scope.user.pact_stakes-= STAKES_INCREMENT;
    if ($scope.user.pact_stakes<MIN_STAKES)
      $scope.user.pact_stakes = MIN_STAKES;
  }

}]);
