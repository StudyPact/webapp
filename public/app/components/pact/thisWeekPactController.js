var module = angular.module("studypact");

module.controller("ThisWeekPactController", ["$scope", "PactService",
  function($scope, PactService) {
    $scope.loadPact = function() {
      $scope.pact = PactService.loadPact();
    };

    $scope.loadPact();
  }
]);