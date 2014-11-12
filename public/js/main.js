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
        .state("home", {
            parent: "loggedIn",
            url: "/home", 
            views: {
                '': {
                    templateUrl: "/templates/layout/cards/boxContainer.html",
                    controller: "BoxController",
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
})

app.run(function (AuthenticationService) {
  AuthenticationService.init();
});
