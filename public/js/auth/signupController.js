var module = angular.module("studypact");

module.controller("SignupController", ["$scope", "$state","UserService","AuthenticationService", function ($scope, $state, userService, authenticationService) {

    $scope.signup = function () {

        userService.createUser($scope.user)
            .then(function(response){
                console.log("Registered new user:", response);
                authenticationService.login($scope.user)
                .then(function(accessToken){
                    $state.go("loggedIn");
                },
                function(error) {
                    //TODO dynamically set error text
                    console.log(error);
                    $scope.loginError = true;
                });
            },
            function(error) {
                console.log(error);
            });
    };
}]);