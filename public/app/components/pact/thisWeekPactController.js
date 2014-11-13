var module = angular.module("studypact");

module.controller("ThisWeekPactController", ["$scope", "$location", "$resource", "$window", function ($scope, $location, $resource, $window) {
    var host = clientConfig.host;

    var error_handler = function(err){
        console.error(err);
        alert(err.data);
    };

    $scope.loadPact = function () {
        $scope.pact = $resource(host + '/api/pacts/current').get(
            function(result){
                console.log("LOADED pact",$scope.pact );
            },
            error_handler);
    };
    $scope.loadPact();
}]);