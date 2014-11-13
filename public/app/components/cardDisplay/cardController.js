var module = angular.module("studypact");

module.controller("CardController", function ($scope, $state) {
    console.log($state);
    $scope.activeCards = $state.current.data.activeBoxes;
});