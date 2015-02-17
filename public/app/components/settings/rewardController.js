angular.module("studypact")

.controller("RewardController", 
  ["$scope", "$resource","UserService",
  function($scope, $resource, UserService) {

  $scope.requestPayout = function() {
    var user = UserService.saveUser({_id:"me", payout_request:true});
    user.$promise.then(function(){
      console.log("successfully requested payout");
    });
    user.$promise.catch(function(error){
      console.error("Could not request payout:", error);
      $scope.error=error;
    });
  };

  $scope.user = UserService.loadUser("me");
}]);
