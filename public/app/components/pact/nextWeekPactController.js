var module = angular.module("studypact");
var HOUR = 60;
var MAX_HOURS = 10;
var MIN_HOURS = 1;

var STAKES_INCREMENT = 5;
var MAX_STAKES = 50;
var MIN_STAKES = 5;

module.controller("NextWeekPactController", ["$scope", "$resource","UserService", 
  function($scope, $resource, UserService) {

  $scope.loadUser = function(id) {
    $scope.user = UserService.loadUser(id);
    $scope.changed = false;
  };

  $scope.save = function() {
    var userUpdate = {
      _id:"me",
      pact_stakes: $scope.user.pact_stakes,
      pact_duration: $scope.user.pact_duration
    };
    $scope.user=UserService.saveUser(userUpdate);
    $scope.user.$promise.then(function(){
      $scope.changed = false;
    });
  };

  $scope.loadUser("me");

  $scope.increaseHours = function() {
    $scope.changed = true;
    $scope.user.pact_duration += HOUR;
    if ($scope.user.pact_duration>HOUR * MAX_HOURS){
      $scope.user.pact_duration = HOUR * MAX_HOURS;
    }
  };

  $scope.decreaseHours = function() {
    $scope.changed = true;
    $scope.user.pact_duration -= HOUR;
    if ($scope.user.pact_duration < HOUR * MIN_HOURS){
      $scope.user.pact_duration = HOUR * MIN_HOURS;
    }
  };

  $scope.increaseStakes = function() {
    $scope.changed = true;
    $scope.user.pact_stakes+= STAKES_INCREMENT;
    if ($scope.user.pact_stakes> MAX_STAKES){
      $scope.user.pact_stakes = MAX_STAKES;
    }
  };

  $scope.decreaseStakes = function() {
    $scope.changed = true;
    $scope.user.pact_stakes-= STAKES_INCREMENT;
    if ($scope.user.pact_stakes<MIN_STAKES){
      $scope.user.pact_stakes = MIN_STAKES;
    }
  };

}]);
