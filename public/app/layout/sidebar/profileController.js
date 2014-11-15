var module = angular.module("studypact");

module.controller("ProfileController", function($scope, $resource) {
  var host = clientConfig.host;

  var error_handler = function(err) {
    console.error(err);
    alert(err.data);
  };


  $scope.loadUser = function() {
    $scope.user = $resource(host + '/api/users/me').get(
      function(result) {
        console.log("LOADED user")
      },
      error_handler);
  };

  $scope.loadUser();
});