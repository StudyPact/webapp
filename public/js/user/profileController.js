var module = angular.module("studypact");

module.controller("ProfileController", ["$scope", "$location", "$resource", "$window", function ($scope, $location, $resource, $window) {
    var host = clientConfig.host;

    var error_handler = function(err){
        console.error(err);
        alert(err.data);
    };

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
                $scope.loadUser();
            },
            error_handler);
    };

    $scope.loadUser = function () {
        $scope.user = $resource(host + '/api/users/me').get(
            function(result){
                console.log("LOADED user")
            },
            error_handler);
    };
    $scope.deleteUser = function(id) {
        var deleteUserDialog = $window.confirm('DELETE user with email: '+$scope.currentUser.email);

        if (deleteUserDialog) {
            $resource(host + '/api/users/me').delete(function(){
                console.log("DELETED");
                $location.path("/user/new");
            });
        }
    }
}]);