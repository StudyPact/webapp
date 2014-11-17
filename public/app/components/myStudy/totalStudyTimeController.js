var module = angular.module("studypact");

module.controller("TotalStudyTimeController", ["$scope", "UserService",
  function($scope, UserService) {
    $scope.loadUser = function(id) {
      $scope.user = UserService.loadUser(id);
    };

    $scope.loadUser("me");
  }
]);