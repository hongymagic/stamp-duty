/* global angular */
angular
.module('stampduty')
.factory('stampduty', ['$log', '$window', function ($log, $window) {
	return $window.stampduty;
}]);
