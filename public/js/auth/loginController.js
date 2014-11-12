var module = angular.module("studypact");

module.controller("LoginController", ["$scope", "$state", "AuthenticationService", function ($scope, $state, authenticationService) {

    $scope.cookieLogin=true;
    $scope.login = function () {
        authenticationService.setCookieLogin($scope.cookieLogin);

        authenticationService.login($scope.user)
            .then(function(accessToken){
                $state.go("home");
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