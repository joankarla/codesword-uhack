angular.module('sampleApp', ['ui.bootstrap', 'ui.router'])

.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

  $locationProvider.html5Mode({
    enabled: true//,
    // requireBase: false
  });

  // $urlRouterProvider.otherwise("/");

  $stateProvider.state("index", {
    url: "/",
    views: {
      "header": {
        templateUrl: "partials/header.html",
        controller: "HeaderController",
        controllerAs: "header"
      },
      "content": {
        templateUrl: "partials/landing.html",
        controller: "LandingPageCtrl",
        controllerAs: "landing"
      }
    },
    data: {
      pageId: "home-page",
      pageTitle: "Home Page"
    }
  });

  $stateProvider.state('paymentPage', {
    url: "/payment",
    views: {
      "header": {
        templateUrl: "partials/header.html",
        controller: "HeaderController",
        controllerAs: "header"
      },
      "content": {
        templateUrl: "partials/payment.html",
        controller: "PaymentPageCtrl",
        controllerAs: "payment"
      }
    },
    data: {
      pageId: "payment-page",
      pageTitle: "Payment"
    }
  })
})
.run(function($rootScope) {
  $rootScope.$on("$stateChangeError", console.log.bind(console));
  $rootScope.$on("$stateChangeSuccess", function (event, toState, toParams, fromState, fromParams) {
    $rootScope.stateData = angular.copy(toState.data);
  });
})

.controller('HeaderController', [
  '$q', '$scope', '$http', '$window', '$log', '$uibModal',
  function($q, $scope, $http, $window, $log, $uibModal) {
    var self = this;
    $log.info("header loaded");

    this.openLogin = function() {
      $log.info("open login modal");

      var modalInstance = $uibModal.open({
        animation: true,
        ariaLabelledBy: 'login',
        ariaDescribedBy: 'login-body',
        templateUrl: 'loginModal.html',
        controller: 'LoginModalCtrl',
        windowClass: 'login-modal'
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
        controller: 'SignUpModalCtrl',
        windowClass: 'signup-modal'
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
.controller('PaymentPageCtrl', function ($scope) {
  $scope.test = {};
})
.controller('LandingPageCtrl', function ($scope) {
  $scope.test = {};
})

;

