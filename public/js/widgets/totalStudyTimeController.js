var module = angular.module("studypact");

module.controller("TotalStudyTimeController", ["$scope", "$location", "$resource", "$window", function ($scope, $location, $resource, $window) {
    var host = clientConfig.host;

    var error_handler = function(err){
        console.error(err);
        alert(err.data);
    };

    $scope.loadUser = function () {
        $scope.user = $resource(host + '/api/users/me').get(
            function(result){
                console.log("LOADED user")
            },
            error_handler);
    };
    $scope.loadUser();
}]);