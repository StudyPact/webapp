var module = angular.module("userModule", ["ngResource"]);
var host = "https://studypact-rest-test.herokuapp.com";

module.controller("UserController", ["$scope","$resource", function ($scope, $resource) {
  $scope.currentUser = {email: "empty"};
  $scope.me = {};

  $scope.getMe = function () {
    var User = $resource(host + '/api/users/me');
    var user = User.get(function () {
      console.log(user);
      $scope.me = user;
    });
  };

  $scope.addUser = function () {
    var user_data = {
      email: $scope.email,
      password: $scope.password,
      scope: "user",
      pact_duration: $scope.duration,
      pact_stakes: $scope.stakes
    };

    var User = $resource(host + '/api/users');
    var user = User.save(user_data, function (userArg) {
      $scope.currentUser = user;
      console.log(userArg, user);
    });
  };
}]);