var module = angular.module("studypact");

module.controller("BoxController", ["$scope", function ($scope) {
    $scope.activeBoxes = [
        "/templates/widgets/totalStudyTime.html",
        "/templates/widgets/profile.html",
        "/templates/widgets/progress.html",
        "/templates/widgets/nextWeek.html",
    ];

}]);