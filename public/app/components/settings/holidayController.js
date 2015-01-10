var module = angular.module("studypact");

module.controller("HolidayController", ["$scope", "$resource","UserService", 
  function($scope, $resource, UserService) {

  $scope.loadUser = function(id) {
    $scope.user = UserService.loadUser(id);
  };

  $scope.save = function() {
    var userUpdate = {
      _id:"me",
      holiday: $scope.user.holiday,
    };
    $scope.user=UserService.saveUser(userUpdate);
  };

  $scope.loadUser("me");
}]);
