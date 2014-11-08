'use strict';

var app = angular.module("studypact", [
    "ui.router",
    "authenticationModule",
    "authenticationModule.services",
]);

// app.js
app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state("main", {
            views: {
                '': {
                    templateUrl: "/templates/layout/layout.html"
                },
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
            url: "/info",
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
        .state("loggedIn.userList", {
            url: "/user/userList",
            templateUrl: "/templates/user/userList.html",
            controller: "UserController"
        })
})

app.run(function (authenticationService) {
  authenticationService.init();
});