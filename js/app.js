angular.module('sampleApp', ['ui.bootstrap'])
.controller('sampleAppController', [
  '$q', '$scope', '$http', '$window', '$log', '$uibModal',
  function($q, $scope, $http, $window, $log, $uibModal) {
    var self = this;
    $log.info("app loaded");

    this.openLogin = function() {
      $log.info("open login modal");

      var modalInstance = $uibModal.open({
        animation: true,
        ariaLabelledBy: 'login',
        ariaDescribedBy: 'login-body',
        templateUrl: 'loginModal.html',
        controller: 'LoginModalCtrl'
      });

      modalInstance.result.then(function (params) {
        $log.info("login with params:", params);
      }, function () {
        $log.info("dismiss login modal");
      });
    };

    this.openSignUp = function() {
      $log.info("open signup modal");

      var modalInstance = $uibModal.open({
        animation: true,
        ariaLabelledBy: 'signup',
        ariaDescribedBy: 'signup-body',
        templateUrl: 'signUpModal.html',
        controller: 'SignUpModalCtrl'
      });

      modalInstance.result.then(function (params) {
        $log.info("sign up with params:", params);
      }, function () {
        $log.info("dismiss signup modal");
      });
    };
  }
])
.controller('LoginModalCtrl', function ($scope, $uibModalInstance) {
  $scope.params = {};

  $scope.ok = function () {
    log.info("login ok");
    $uibModalInstance.close($scope.params);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
})
.controller('SignUpModalCtrl', function ($scope, $uibModalInstance) {
  $scope.params = {};

  $scope.ok = function () {
    $uibModalInstance.close($scope.params);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
})
;

