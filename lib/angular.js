/* global angular */
angular
.module('stampduty', [])
.factory('stampduty', ['$window', function ($window) {
	return $window.stampduty;
}]);
