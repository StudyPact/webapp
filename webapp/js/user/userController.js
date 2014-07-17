var module = angular.module("userModule", ["ngResource"]);

module.controller("UserController", ["$scope","$resource", function ($scope, $resource) {
    var host = clientConfig.host;

    $scope.users = {};

    $scope.getAllUsers = function () {
        var Users = $resource(host + '/api/users', {}, {'query':  {method:'GET', isArray:true}});
        var users = Users.query(function () {
            $scope.users = users;
        });
    };
}]);

module.controller("UserDetailsController", ["$scope", "$resource", "$routeParams","$window", function ($scope, $resource, $routeParams, $window) {
    var host = clientConfig.host;

    var error_handler = function(err){
        console.error(err);
        alert(err.data);
    };
    $scope.currentUser = {};
    $scope.newUser = {};
    $scope.user_pacts = {};

    $scope.updateUser = function () {
        var updatedUser = {
            email: $scope.currentUser.email,
            paypal_email: $scope.currentUser.paypal_user,
            displayname: $scope.currentUser.displayname,
            payment_status: $scope.currentUser.payment_status,
            current_earnings: $scope.currentUser.current_earnings,
            holiday: $scope.currentUser.holiday,
            payout_request: $scope.currentUser.payout_request
        }
        var User = $resource(host + '/api/users/me', null, {"update": { method: "PUT" }});
        User.update({userId: $scope.currentUser._id}, updatedUser,
        function(result){
            init();
        }, 
        error_handler);
    };

    $scope.createUser = function () {
        var newUser = {
            email: $scope.newUser.email,
            password: $scope.newUser.password,
            displayname: $scope.newUser.displayname,
        }
        var User = $resource(host + '/api/users');
        User.save(newUser, function(result){
            console.log("CREATED");
        }, 
        error_handler);
    };

    $scope.loadUser = function () {
        $scope.currentUser = $resource(host + '/api/users/me').get();
    };
    $scope.deleteUser = function(id) {
        var deleteUserDialog = $window.confirm('DELETE user with email: '+$scope.currentUser.email);   

        if (deleteUserDialog) {
            $resource(host + '/api/users/me').delete(function(){
                console.log("DELETED");
            });
        }
    }
}]);