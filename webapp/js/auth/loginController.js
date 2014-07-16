var module = angular.module("authenticationModule", ["ngResource", "authenticationModule.services"]);

module.controller("LoginController", ["$scope", "$location", "authenticationService", function ($scope, $location, authenticationService) {

    $scope.login = function () {
        var authEmail = $scope.authEmail;
        var authPassword = $scope.authPassword;

        authenticationService.setCookieLogin($scope.cookieLogin);

        authenticationService.authenticate(authEmail, authPassword)
            .then(function(accessToken){
                $location.path("/user/userList");
            },
            function(error) {
                //TODO dynamically set error text
                console.log(error);
                $scope.loginError = true;
            });
    };
    $scope.logout = function () {
        authenticationService.logout();
        $location.path("/");
    };
}]);