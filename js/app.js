angular.module('sampleApp', [])
.config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
}])

.controller('sampleAppController', [
  '$q', '$scope', '$http', '$window',
  function($q, $scope, $http, $window) {
    var self = this;
  }
])

