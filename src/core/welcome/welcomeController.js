'use strict';

angular.module('studypact')
	.controller('WelcomeController', function ($rootScope, $scope, userService, $state, $modal) {

		$scope.login = function () {
			// userService.auth = {
			// 	name: 'John Smith'
			// };

			// $state.go('home');

            return $modal.open({
                templateUrl: 'welcome/modals/login.tpl.html',
                controller: ['$scope', '$modalInstance', function ($scope, $modalInstance) {
                    // $scope.content = content;
                    // $scope.okText = okText;
                    // $scope.cancelText = cancelText;
                    $scope.login = function () {
                        $modalInstance.close();
                    };
                    // $scope.cancel = function () {
                    //     $modalInstance.dismiss('cancel');
                    // };
                }]
            }).result;
		};

        $scope.signup = function () {
            return $modal.open({
                templateUrl: 'welcome/modals/signup.tpl.html',
                controller: ['$scope', '$modalInstance', function ($scope, $modalInstance) {
                    // $scope.content = content;
                    // $scope.okText = okText;
                    // $scope.cancelText = cancelText;
                    $scope.login = function () {
                        $modalInstance.close();
                    };
                    // $scope.cancel = function () {
                    //     $modalInstance.dismiss('cancel');
                    // };
                }]
            }).result;
        };

	});