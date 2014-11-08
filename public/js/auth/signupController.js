var module = angular.module("restModule", ["ngResource", "restModule.services"]);

module.controller("SignupController", ["$scope", "$state", "userService", function ($scope, $state, userService) {

    $scope.signup = function () {

        var user = {
            email: $scope.email,
            password: $scope.password
        }

        userService.createUser(user)
            .then(function(response){
                console.log(response)
            },
            function(error) {
                console.log(error);
            });
    };
}]);