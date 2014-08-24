'use strict';

angular.module('studypact', [
    'ui.router',
    'snap',
    'templates_lib',
    'templates'
])
.controller('MainController', function ($rootScope, userService) {

	$rootScope.userService = userService;

})
.config(function (snapRemoteProvider) {
    snapRemoteProvider.globalOptions = {
        disable: 'right',
        hyperextensible: false,
        maxPosition: 265,
        minPosition: -265
    };
});
