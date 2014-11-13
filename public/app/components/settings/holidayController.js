var module = angular.module("studypact");

module.controller("HolidayController", function($scope, $resource) {
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

  $scope.save = function() {
    var updatedUser = {
      holiday: $scope.user.holiday,
    }
    var User = $resource(host + '/api/users/me', null, {
      "update": {
        method: "PUT"
      }
    });
    User.update({
        userId: $scope.user._id
      }, updatedUser,
      function(result) {
        console.log("Success");
      },
      error_handler);
  };

  $scope.loadUser();
});