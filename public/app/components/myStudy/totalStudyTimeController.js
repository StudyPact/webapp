var module = angular.module("studypact");

module.controller("TotalStudyTimeController", ["$scope", "UserService",
  function($scope, UserService) {
    var host = clientConfig.host;

    $scope.loadUser = function(id) {
      $scope.user = UserService.loadUser(id);
    };
    
    $scope.loadUser("me");
  }
]);