'use strict';

angular.module('studypact')
	.controller('LoginController', function ($rootScope, $scope, userService, $state) {

		$scope.login = function () {
			userService.auth = {
				name: 'John Smith'
			};

			$state.go('home');
		};

	});