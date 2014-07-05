var module = angular.module("authenticationModule", ["ngResource"]);

module.controller("AuthenticationController", ["$scope", "$http","$location", function ($scope, $http, $location) {
  var authUrl = "https://studypact-rest-test.herokuapp.com/oauth/token"

  $scope.authenticate = function () {
    var authEmail = $scope.authEmail;
    var authPassword = $scope.authPassword;

    var request_data = {
      grant_type: "password",
      client_id: "q7K8CXVz7kaNl6SK",
      client_secret: "uIMQ8EFVMgg8Tq81PRq07TfPFJYtHDIp",
      scope: "user",
      username: authEmail,
      password: authPassword
    };
    $http.post(authUrl, request_data)
      .success(function (data, status, headers, config) {
            $http.defaults.headers.get = {"Authorization": "Bearer " + data.access_token};
            $http.defaults.headers.post.Authorization = "Bearer " + data.access_token;
            $location.path("/webapp/me");
      })
      .error(function (data, status, headers, config) {
        console.log(data, status);
      });
  };

}]);