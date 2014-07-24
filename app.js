'use strict';

angular.module('studypact', [
    'snap',
    'constants',
    'templates_lib',
    'templates'
])
.controller('MainController', function () {

})
.config(function (snapRemoteProvider) {
    snapRemoteProvider.globalOptions = {
        disable: 'right',
        hyperextensible: false,
        maxPosition: 265,
        minPosition: -265
    };
});
