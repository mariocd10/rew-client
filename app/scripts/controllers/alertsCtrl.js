'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:AlertsCtrl
 * @description
 * # AlertsCtrl
 * Controller of the clientApp
 */
angular.module('clientApp').controller('alertsCtrl',
		function($scope, alertService) {
			$scope.alerts = alertService.get();
		}
);
