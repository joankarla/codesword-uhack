angular.module('sampleApp', ['ui.bootstrap', 'ui.router', 'firebase'])

.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

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
    resolve: {
      "currentAuth": ["Auth", function(Auth) {
        return Auth.$requireSignIn();
      }]
    },
    data: {
      pageId: "payment-page",
      pageTitle: "Payment"
    }
  });

  $stateProvider.state('schoolAdminPage', {
    url: "/dashboard",
    views: {
      "header": {
        templateUrl: "partials/header.html",
        controller: "HeaderController",
        controllerAs: "header"
      },
      "content": {
        templateUrl: "partials/schoolAdmin.html",
        controller: "SchoolAdminPageCtrl",
        controllerAs: "schoolAdmin"
      }
    },
    resolve: {
      "currentAuth": ["Auth", function(Auth) {
        return Auth.$requireSignIn();
      }]
    },
    data: {
      pageId: "school-admin-page",
      pageTitle: "Dashboard"
    }
  });

  $stateProvider.state('profilePage', {
    url: "/profile",
    views: {
      "header": {
        templateUrl: "partials/header.html",
        controller: "HeaderController",
        controllerAs: "header"
      },
      "content": {
        templateUrl: "partials/profile.html",
        controller: "ProfilePageCtrl",
        controllerAs: "profile"
      }
    },
    resolve: {
      "currentAuth": ["Auth", function(Auth) {
        return Auth.$requireSignIn();
      }]
    },
    data: {
      pageId: "profile-page",
      pageTitle: "Profile"
    }
  });
})
.run(function($rootScope, $state) {
  $rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {
    if (error === "AUTH_REQUIRED") {
      $state.go("index");
    }
  });
  $rootScope.$on("$stateChangeSuccess", function (event, toState, toParams, fromState, fromParams) {
    $rootScope.stateData = angular.copy(toState.data);
  });
})
.factory("Auth", ["$firebaseAuth",
  function($firebaseAuth) {
    return $firebaseAuth();
  }
])
.factory("Profile", ["$firebaseObject",
  function($firebaseObject) {
    return function(uid) {
      var ref = firebase.database().ref("profiles");
      var profileRef = ref.child(uid);
      return $firebaseObject(profileRef);
    }
  }
])

.controller('SampleAppController', [
  '$scope', '$rootScope', '$log', 'Auth', 'Profile',
  function($scope, $rootScope, $log, Auth, Profile) {
    Auth.$onAuthStateChanged(function(firebaseUser) {
      $rootScope.currentUser = firebaseUser;
      Profile(firebaseUser.uid).$loaded().then(function(profile){
        $rootScope.currentProfile = profile;
      }).catch(function(error){
        $log.error("error loading profile: ", error);
      });
    });
  }
])
.controller('HeaderController', [
  '$q', '$scope', '$http', '$window', '$log', '$uibModal', 'Auth',
  function($q, $scope, $http, $window, $log, $uibModal, Auth) {
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

      modalInstance.result.then(function () {
        $log.info("login modal closed");
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

      modalInstance.result.then(function () {
        $log.info("sign up modal closed");
      }, function () {
        $log.info("dismiss signup modal");
      });
    };

    this.signOut = function() {
      Auth.$signOut().then(function() {
        $window.location.replace("/");
      }, function(error) {
        $log.error(error);
      });
    };
  }
])
.controller('LoginModalCtrl', function ($scope, $rootScope, $window, $uibModalInstance, Auth) {
  $scope.signIn = function() {
    $scope.firebaseUser = null;
    $scope.error = null;

    Auth.$signInWithEmailAndPassword($scope.email, $scope.password).then(function(firebaseUser) {
      $rootScope.firebaseUser = firebaseUser;
      $window.location.replace("/payment");
      $uibModalInstance.close();
    }).catch(function(error) {
      $scope.error = error;
    });
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
})
.controller('SignUpModalCtrl', function ($scope, $log, $window, $uibModalInstance, Auth, Profile) {
  $scope.userType = 'payor';

  $scope.createUser = function() {
    $log.info("create User");
    $scope.error = null;

    if ($scope.password != $scope.passwordConfirm) {
      $scope.error = {
        'code': 'password.mismatch',
        'message': "Passwords Don't Match"
      }
      return;
    }

    Auth.$createUserWithEmailAndPassword($scope.email, $scope.password)
      .then(function(firebaseUser) {
        $log.info("User created with uid: " + firebaseUser.uid);
        var profile = Profile(firebaseUser.uid);
        profile.firstName = $scope.firstName;
        profile.middleName = $scope.middleName;
        profile.lastName = $scope.lastName;
        profile.address = $scope.address;
        profile.mobileNumber = $scope.mobileNumber;
        profile.landline = $scope.landline;
        profile.userType = $scope.userType;

        //TODO: save other params in php server

        profile.$save().then(function() {
          if (profile.userType == 'payor') {
            $window.location.replace("/payment");
          } else if (profile.userType == 'school') {
            $window.location.replace("/dashboard");
          }
          $uibModalInstance.close();
        }).catch(function(error) {
          $log.error("error saving profile: ", error);
        });
      }).catch(function(error) {
        $scope.error = error;
      });
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
})

.controller('PaymentPageCtrl', function ($scope) {

})
.controller('LandingPageCtrl', function ($scope) {

})
.controller('SchoolAdminPageCtrl', function ($scope) {

})
.controller('ProfilePageCtrl', function ($scope, $rootScope) {

})

.directive("matchTo", [
  "$parse",
  function($parse) {
    return {
      require: "ngModel",
      scope: false,
      link: function(scope, element, attrs, ngModel) {
        function validate(value) {
          var otherModel = $parse(attrs.matchTo)(scope) || "";
          var model = value ? value : "";
          var valid = otherModel === model;
          ngModel.$setValidity("matchTo", valid);
          return valid;
        }

        scope.$watch(attrs.matchTo, function(value) {
          return validate(ngModel.$viewValue);
        });

        ngModel.$parsers.unshift(function(value) {
          if (validate(value)) {
            return value;
          } else {
            return;
          }
        });
        return;
      }
    };
  }
])
;

