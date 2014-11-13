'use strict';

var app = angular.module("studypact", [
    "ui.router",
    "ngResource"
]);

// app.js
app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state("layout", {
            views: {
                '': {
                    templateUrl: "/templates/layout/layout.html"
                }
            }
        })
        .state("loggedOut", {
            parent: "layout",
            views: {
                '': {
                    templateUrl: "/templates/info/gettingStarted.html"
                },
                'navbar': {
                    templateUrl: "/templates/navbar/loggedOutNavbar.html",
                    controller: "LoginController"
                }
            },
            url: "/info"
        })
        .state("loggedIn", {
            parent: "layout",
            views: {
                '': {
                    templateUrl: "/templates/layout/loggedInContentLayout.html"
                },
                'navbar': {
                    templateUrl: "/templates/navbar/loggedInNavbar.html",
                    controller: "LoginController"
                }
            }
        })
        .state("main", {
            parent: "loggedIn",
            views: {
                '': {
                    templateUrl: "/templates/layout/cards/centerLayout.html",
                },
                'sidebar': {
                    templateUrl: "/templates/sidebar/studyActivities.html",
                    controller: "StudyActivityFeedController"
                },
                'profile': {
                    templateUrl: "/templates/sidebar/profileSummary.html",
                },
                'menu': {
                    templateUrl: "/templates/menu/mainMenu.html",
                }
            }
        })
        .state("home", {
            parent: "main",
            url: "/home",
            data: {
                activeBoxes: [
                    "/templates/widgets/totalStudyTime.html",
                    "/templates/widgets/progress.html",
                    "/templates/widgets/nextWeek.html",
                ]
            },
            templateUrl: "/templates/layout/cards/boxContainer.html",
            controller: "BoxController",
        })
        .state("settings", {
            parent: "main",
            url: "/settings",
            data: {
                activeBoxes: [
                    "/templates/widgets/profile.html",
                ]
            },
            templateUrl: "/templates/layout/cards/boxContainer.html",
            controller: "BoxController",
        })
})

app.run(function(AuthenticationService) {
    AuthenticationService.init();
});