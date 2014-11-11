var module = angular.module("studypact");

module.controller("SignupController", ["$scope", "$state","UserService","AuthenticationService", function ($scope, $state, userService, authenticationService) {

    $scope.signup = function () {
        userService.createUser($scope.user)
            .then(function(response){
                console.log("Registered new user:", response);
                authenticationService.login($scope.user)
                .then(function(accessToken){
                    $state.go("loggedIn");
                });
            },
            function(error) {
                console.log("signup error:",error.status);
                $scope.error = {};
                if (error.status===409){
                    console.log("409")
                    $scope.error.mailInUseError=true;
                }
                else{
                    $scope.error.serverError=true;
                };
            });
    };
}]);