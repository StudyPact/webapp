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
                '': {
                    templateUrl: "/templates/layout/layout.html"
                },
            }
        })
        .state("woot", {
            url:"/woot",
            templateUrl: "/templates/modals/login.html"
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
        .state("login", {
            parent: "loggedOut",
            url: "/login",
            templateUrl: "/templates/modals/login.html",
            //controller: "LoginController",
            controller: function($scope){
                $scope.title = 'My Contacts';
                console.log("LOGIN MODAL LOADED")
            } 
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