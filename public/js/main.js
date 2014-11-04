'use strict';

var app = angular.module("studypact", [
    "ui.router",
    "authenticationModule",
    "authenticationModule.services",
]);

// app.js
app.config(function($stateProvider, $urlRouterProvider) {
    console.log("config");
    $urlRouterProvider.otherwise('/info');

    $stateProvider
        .state("main", {
            views: {
                // the main template will be placed here (relatively named)
                '': {
                    templateUrl: "/templates/layout/layout.html"
                },
                // the child views will be defined here (absolutely named)
                'navbar@main': {
                    templateUrl: "/templates/navbar/navbar.html",
                    controller: "LoginController"
                }
            }
        })
        .state("main.loggedOut", {
            url: "/info",
            templateUrl: "/templates/info/gettingStarted.html",
        })
        .state("main.loggedIn", {
            views: {
                // the main template will be placed here (relatively named)
                '': {
                    templateUrl: "/templates/layout/loggedIn.html"
                },
                // the child views will be defined here (absolutely named)
                'navbar@loggedIn': {
                    templateUrl: "/templates/nav/navbar.html"
                }
            }
        })
        .state("loggedIn.userList", {
            url: "/user/userList",
            templateUrl: "/templates/user/userList.html",
            controller: "UserController"
        })
})
    .run(function($rootScope, $state, authenticationService) {
        $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {
            if (!authenticationService.getAccessToken()) {
                if (toState.name === "loggedOut"){
                    return;
                }
                event.preventDefault();
                $state.go('loggedOut');
            }  else {
                if (toState.name === "loggedOut"){
                    event.preventDefault();
                    $state.go('loggedIn');
                }
            }
        });
    })