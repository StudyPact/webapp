'use strict';

angular.module('studypact')
    .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {

        $locationProvider.html5Mode(true);

        // For any unmatched url, redirect to /state1
        $urlRouterProvider.otherwise('/');

        // Now set up the states
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'home/home.tpl.html',
                controller: 'HomeController'
            })
            .state('login', {
                url: '/login',
                templateUrl: 'login/login.tpl.html',
                controller: 'LoginController'
            });


    })
    .run(function ($rootScope, $location, $window) {

        $rootScope.$on('$locationChangeStart', function () {
            if (!$rootScope.auth) {
                // no logged user, we should be going to #login
                if ($window.location.pathname !== '/login') {
                    $location.path('/login');
                }
            }
        });

    });