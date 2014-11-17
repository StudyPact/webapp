var module = angular.module("studypact");

module.controller("CardController", function($scope, $state) {
  $scope.activeCards = $state.current.data.activeBoxes;
});