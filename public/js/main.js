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
                    templateUrl: "/templates/main/main.html"
                },
                'navbar': {
                    templateUrl: "/templates/navbar/navbarLoggedIn.html"
                }
            }
        })
        .state("mainBoxView", {
            parent: "loggedIn",
            url: "/main",
            templateUrl: "/templates/main/boxContainer.html",
            controller: "BoxController"
        })
})

app.run(function (AuthenticationService) {
  AuthenticationService.init();
});
