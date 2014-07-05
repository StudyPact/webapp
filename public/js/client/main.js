var app = angular.module("app",
  [
    "ngResource",
    "ngRoute",
    "userModule",
    "authenticationModule"
  ]);

app.config(["$routeProvider",
  function($routeProvider) {
    $routeProvider.
      when('/webapp/login', {
        templateUrl: '/webapp/login/login',
        controller: 'AuthenticationController'
      }).
      when('/webapp/me', {
        templateUrl: "/webapp/user/myProfile",
        controller: 'UserController'
      }).
      when('/webapp/register', {
        templateUrl: "/webapp/user/registerUser",
        controller: 'UserController'
      }).
      otherwise({
        redirectTo: "/webapp/login"
      });
  }]);