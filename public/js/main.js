'use strict';

var app = angular.module("studypact", [
    "ui.router",
    "ngResource"
]);

// app.js
app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state("main", {
            views: {
                '': {
                    templateUrl: "/templates/layout/layout.html"
                }
            }
        })
        .state("loggedOut", {
            parent: "main",
            views: {
                '': {
                    templateUrl: "/templates/info/gettingStarted.html"
                },
                'navbar': {
                    templateUrl: "/templates/navbar/navbarLoggedOut.html",
                    controller: "LoginController"
                }
            },
            url: "/info"
        })
        .state("loggedIn", {
            parent: "main",
            url: "/loggedin",
            views: {
                '': {
                    templateUrl: "/templates/main/loggedIn.html"
                },
                'navbar': {
                    templateUrl: "/templates/navbar/navbarLoggedIn.html"
                }
            }
        })
        .state("userProfile", {
            parent: "loggedIn",
            url: "/profile",
            templateUrl: "/templates/user/profile.html",
            controller: "ProfileController"
        })
})

app.run(function (AuthenticationService) {
  AuthenticationService.init();
});