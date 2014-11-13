var module = angular.module("studypact");

module.controller("StudyActivityFeedController", ["$scope", function ($scope) {
    $scope.studySessions = [
        {
          studyapp:"0921831SAD",
          start: new Date (new Date().getTime()-5*60*1000),
          end: new Date (new Date().getTime()-1*60*1000)
        },
        {
          studyapp:"0921831SAD",
          start: new Date (new Date().getTime()-500*60*1000),
          end: new Date (new Date().getTime()-490*60*1000)
        },
        {
          studyapp:"0921831SAD",
          start: new Date (new Date().getTime()-10055*60*1000),
          end: new Date (new Date().getTime()-10000*60*1000)
        },
    ];

}]);