var module = angular.module("authenticationModule", ["ngResource", "authenticationModule.services"]);

module.controller("LoginController", ["$scope", "authenticationService", function ($scope, authenticationService) {

    $scope.login = function () {
        var authEmail = $scope.authEmail;
        var authPassword = $scope.authPassword;
        authenticationService.setCookieLogin($scope.cookieLogin);

        authenticationService.authenticate(authEmail, authPassword)
            .then(function(accessToken){
                $scope.go("loggedIn");
            },
            function(error) {
                //TODO dynamically set error text
                console.log(error);
                $scope.loginError = true;
            });
    };
    $scope.logout = function () {
        console.log("Trying logout")
        authenticationService.logout();
        $scope.go("loggedOut");
    };
}]);