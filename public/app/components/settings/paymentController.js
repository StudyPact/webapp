angular.module("studypact")

.controller("PaymentController", ["$scope", "$resource", "UserService",
  function($scope, $resource, UserService) {

    $scope.updatePaymentInfo = function() {};

    $scope.user = UserService.loadUser("me");
  }
]);
