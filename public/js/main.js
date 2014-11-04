'use strict';

var app = angular.module("app", [
    "ui.router",
    "userModule",
    "authenticationModule",
    "authenticationModule.services",
    "pactModule",
    "studyappModule",
    "statisticsModule",
    "growthModule",
]);

// app.js
app.config(function($stateProvider, $urlRouterProvider) {
    console.log("config");
    $urlRouterProvider.otherwise('/login');

    $stateProvider
        .state("login", {
            url: "/login",
            templateUrl: "/admin/views/login/login.html",
            controller: "LoginController"
        })
        .state("loggedin", {
            views: {
                // the main template will be placed here (relatively named)
                '': {
                    templateUrl: "/admin/views/layout/loggedin.html"
                },
                // the child views will be defined here (absolutely named)
                'navbar@loggedin': {
                    templateUrl: "/admin/views/nav/navbar.html"
                }
            }
        })
        .state("loggedin.userList", {
            url: "/user/userList",
            templateUrl: "/admin/views/user/userList.html",
            controller: "UserController"
        })
})
    .run(function($rootScope, $state, authenticationService) {
        $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {
            if (!authenticationService.getAccessToken()) {
                if (toState.name === "login"){
                    return;
                }
                event.preventDefault();
                $state.go('login');
            }  else {
                if (toState.name === "login"){
                    event.preventDefault();
                    $state.go('loggedin');
                }
            }
        });
    })