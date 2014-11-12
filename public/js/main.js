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
            url: "/main",
            templateUrl: "/templates/main/boxContainer.html",
            controller: "BoxController"
        })
})

app.run(function (AuthenticationService) {
  AuthenticationService.init();
});
