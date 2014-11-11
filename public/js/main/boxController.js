var module = angular.module("studypact");

module.controller("BoxController", ["$scope", function ($scope) {
    $scope.activeBoxes = [
        "/templates/widgets/profile.html",
        "/templates/widgets/nextWeek.html",
        "/templates/widgets/progress.html"
    ];

}]);