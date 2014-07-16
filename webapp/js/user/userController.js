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
        var User = $resource(host + '/api/users/:userId', null, {"update": { method: "PUT" }});
        User.update({userId: $scope.currentUser._id}, updatedUser,
        function(result){
            init();
        }, 
        error_handler);
    };

    var load_user_pacs = function(user_id){
        var pact_query = $resource(host + '/api/pacts');
        pact_query.query({owner: user_id},function (result) {
            $scope.user_pacts = result;
        });
    }
    var init = function () {
        if($routeParams.userId){
            var id = $routeParams.userId;
            $scope.currentUser = $resource(host + '/api/users/:userId', {userId: '@id'}).get({userId: id});
        } else if($routeParams.userEmail){
            var email = $routeParams.userEmail;
            var Users = $resource(host + '/api/users');
            var users = Users.query({email:email}, function () {
                $scope.currentUser = users[0];
            });
        };
        load_user_pacs($routeParams.userId);
    };
    $scope.deleteUser = function(id) {
        var deleteUserDialog = $window.confirm('DELETE user with email: '+$scope.currentUser.email);   

        if (deleteUserDialog) {
            $resource(host + '/api/users/:userId').delete({userId: id}, function(){
                console.log("DELETED");
                init();
            });

        }
    }
            
    init();
}]);