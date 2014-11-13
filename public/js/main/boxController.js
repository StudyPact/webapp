var module = angular.module("studypact");

module.controller("BoxController", function ($scope, $state) {
    console.log($state);
    $scope.activeBoxes = $state.current.data.activeBoxes;
});