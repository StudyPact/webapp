'use strict';

angular.module('studypact', [
    'ui.router',
    'snap',
    'ui.bootstrap.transition',
    'ui.bootstrap.modal',
    'angus.templates.lib',
    'angus.templates.app'
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
