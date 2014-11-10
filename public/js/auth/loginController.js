var module = angular.module("authenticationModule", ["ngResource", "authenticationModule.services"]);

module.controller("LoginController", ["$scope", "$state", "authenticationService", function ($scope, $state, authenticationService) {

    $scope.login = function () {
        authenticationService.setCookieLogin($scope.cookieLogin);

        authenticationService.login($scope.user)
            .then(function(accessToken){
                $state.go("loggedIn");
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
        $state.go("loggedOut");
    };
}]);