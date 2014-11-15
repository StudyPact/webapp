'use strict';

var app = angular.module("studypact", [
    "ui.router",
    "ngResource",
    "angularMoment"
]);

// app.js
app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state("layout", {
            views: {
                '': {
                    templateUrl: "/app/layout/layout.html"
                }
            }
        })
        .state("loggedOut", {
            parent: "layout",
            views: {
                '': {
                    templateUrl: "/app/components/landingPage/gettingStarted.html"
                },
                'navbar': {
                    templateUrl: "/app/layout/topNav/loggedOutNavbar.html",
                }
            },
            url: "/info"
        })
        .state("loggedIn", {
            parent: "layout",
            views: {
                '': {
                    templateUrl: "/app/layout/loggedInContentLayout.html"
                },
                'navbar': {
                    templateUrl: "/app/layout/topNav/loggedInNavbar.html",
                    controller: "LoginController"
                }
            }
        })
        .state("main", {
            parent: "loggedIn",
            views: {
                '': {
                    templateUrl: "/app/components/cardDisplay/cardDisplayLayout.html",
                },
                'sidebar': {
                    templateUrl: "/app/layout/sidebar/studyActivitiesFeedView.html",
                },
                'profile': {
                    templateUrl: "/app/layout/sidebar/profileSummaryView.html",
                },
                'menu': {
                    templateUrl: "/app/layout/subNav/subNavView.html",
                }
            }
        })
        .state("myStudy", {
            parent: "main",
            url: "/myStudy",
            data: {
                activeBoxes: [
                    "/app/components/pact/progressView.html",
                    "/app/components/myStudy/totalStudyTimeView.html",
                    "/app/components/pact/nextWeekPactView.html",
                ]
            },
            templateUrl: "/app/components/cardDisplay/cardContainerView.html",
            controller: "CardController",
        })
        .state("settings", {
            parent: "main",
            url: "/settings",
            data: {
                activeBoxes: [
                    "/app/components/settings/holidayView.html",
                    "/app/components/myStudy/profileView.html",
                ]
            },
            templateUrl: "/app/components/cardDisplay/cardContainerView.html",
            controller: "CardController",
        })
        .state("friends", {
            parent: "main",
            url: "/friends",
            data: {
                activeBoxes: [
                    "/app/components/friends/friendListView.html",
                    "/app/components/friends/findFriendsView.html",
                ]
            },
            templateUrl: "/app/components/cardDisplay/cardContainerView.html",
            controller: "CardController",
        })
})

app.run(function(AuthenticationService) {
    AuthenticationService.init();
});
