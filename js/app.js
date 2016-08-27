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

  $stateProvider.state('userPaymentsPage', {
    url: "/payments",
    views: {
      "header": {
        templateUrl: "partials/header.html",
        controller: "HeaderController",
        controllerAs: "header"
      },
      "content": {
        templateUrl: "partials/userPayments.html",
        controller: "UserPaymentsPageCtrl",
        controllerAs: "userPayments"
      }
    },
    resolve: {
      "currentAuth": ["Auth", function(Auth) {
        return Auth.$requireSignIn();
      }]
    },
    data: {
      pageId: "user-payments-page",
      pageTitle: "Payments"
    }
  });

  $stateProvider.state('userStudentsPage', {
    url: "/dependents",
    views: {
      "header": {
        templateUrl: "partials/header.html",
        controller: "HeaderController",
        controllerAs: "header"
      },
      "content": {
        templateUrl: "partials/userStudents.html",
        controller: "UserStudentsPageCtrl",
        controllerAs: "userStudents"
      }
    },
    resolve: {
      "currentAuth": ["Auth", function(Auth) {
        return Auth.$requireSignIn();
      }]
    },
    data: {
      pageId: "user-students-page",
      pageTitle: "Dependents"
    }
  });

  $stateProvider.state('schoolPaymentsPage', {
    url: "/report",
    views: {
      "header": {
        templateUrl: "partials/header.html",
        controller: "HeaderController",
        controllerAs: "header"
      },
      "content": {
        templateUrl: "partials/schoolPayments.html",
        controller: "SchoolPaymentsPageCtrl",
        controllerAs: "schoolPayments"
      }
    },
    resolve: {
      "currentAuth": ["Auth", function(Auth) {
        return Auth.$requireSignIn();
      }]
    },
    data: {
      pageId: "school-payments-page",
      pageTitle: "Payments"
    }
  });
  $stateProvider.state('schoolSubjectsPage', {
    url: "/subjects",
    views: {
      "header": {
        templateUrl: "partials/header.html",
        controller: "HeaderController",
        controllerAs: "header"
      },
      "content": {
        templateUrl: "partials/schoolSubjects.html",
        controller: "SchoolSubjectsPageCtrl",
        controllerAs: "schoolSubjects"
      }
    },
    resolve: {
      "currentAuth": ["Auth", function(Auth) {
        return Auth.$requireSignIn();
      }]
    },
    data: {
      pageId: "school-subjects-page",
      pageTitle: "Subjects"
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
.factory("User", ["$http", "$q", "$log", "$rootScope", "Payment", "School", "Student",
  function($http, $q, $log, $rootScope, Payment, School, Student) {
    function User(apiData) {
      apiData = apiData || {};
      angular.extend(this, apiData);
    }

    User.prototype.isTypeSchool = function() {
      return this.usertype == 'school';
    }
    User.prototype.isTypeUser = function() {
      return this.usertype == 'user';
    }
    User.prototype.isTypeAdmin = function() {
      return this.usertype == 'admin';
    }

    User.prototype.getInfo = function() {
      var infoUrl = "http://localhost/data/handleData.php?utype=user&dtype=info";
      var params = "&email=" + this.email;
      return $http.get(infoUrl+params).then(function(response) {
        $log.info("successfully fetched user info", response.data[0]);
        angular.extend($rootScope.currentUser, response.data[0]);
        return $rootScope.currentUser;
      }, function(response) {
        $log.error("Cannot get userInfo " + response);
        return $q.reject(response);
      });
    };

    User.prototype.saveInfo = function() {
      //TODO: save user + school params in php server
      return $q.when(this);
    };

    User.prototype.getSchoolInfo = function() {
      if (!this.isTypeSchool()) {
        return $q.reject("usertype other than 'school' cannot get school info");
      }

      var schoolInfoUrl = "http://localhost/data/handleData.php?utype=school&dtype=info";
      var params ="&id=" + this.sid;
      return $http.get(schoolInfoUrl+params).then(function(response) {
        $log.info("successfully fetched school info", response.data[0]);
        var school = new School(response.data[0]);
        $rootScope.currentUser.school = school;
        return school;
      }, function(response) {
        $log.warn("Cannot get school info " + response);
        return $q.reject(response);
      });
    }

    User.prototype.getPaymentsMade = function() {
      var paymentsUrl = "http://localhost/data/handleData.php?utype=user&dtype=payments";
      var params ="&id=" + this.uid;
      return $http.get(paymentsUrl+params).then(function(response) {
        var i, len, payments = [];
        for (i = 0, len = response.data.length; i < len; i++) {
          payments.push(new Payment(response.data[i]));
        }

        $log.info("successfully fetched user payments", payments);
        return payments
      }, function(response) {
        $log.warn("Cannot get payments " + response);
        return $q.reject(response);
      });
    }

    User.prototype.getStudents = function() {
      var studentsUrl = "http://localhost/data/handleData.php?utype=user&dtype=dependents";
      var params = "&id=" + this.uid;
      return $http.get(studentsUrl+params).then(function(response) {
        var i, len, students = [];
        for (i = 0, len = response.data.length; i < len; i++) {
          students.push(new Student(response.data[i]));
        }

        $log.info("successfully fetched school subjects", students);
        return students;
      }, function(response) {
        $log.warn("Cannot get school subjects " + response);
        return $q.reject(response);
      });
    }

    return User;
  }
])
.factory("School", ["$http", "$q", "$log", "$rootScope", "Payment", "Subject",
  function($http, $q, $log, $rootScope, Payment, Subject) {
    function School(apiData) {
      apiData = apiData || {};
      angular.extend(this, apiData);
    }

    School.prototype.getPaymentsReceived = function() {
      if ($rootScope.currentUser.isTypeUser()){
        return $q.reject("usertype 'user' can't view received payments");
      }

      var paymentsUrl = "http://localhost/data/handleData.php?utype=school&dtype=payments";
      var params = "&id=" + this.sid;
      return $http.get(paymentsUrl+params).then(function(response) {
        var i, len, payments = [];
        for (i = 0, len = response.data.length; i < len; i++) {
          payments.push(new Payment(response.data[i]));
        }

        $log.info("successfully fetched school payments", payments);
        return payments;
      }, function(response) {
        $log.warn("Cannot get school payments " + response);
        return $q.reject(response);
      });
    }

    School.prototype.getSubjects = function() {
      if ($rootScope.currentUser.isTypeUser()){
        return $q.reject("usertype 'user' can't view subjects");
      }

      var subjectsUrl = "http://localhost/data/handleData.php?utype=school&dtype=subjects";
      var params = "&id=" + this.sid;
      return $http.get(subjectsUrl+params).then(function(response) {
        var i, len, subjects = [];
        for (i = 0, len = response.data.length; i < len; i++) {
          subjects.push(new Subject(response.data[i]));
        }

        $log.info("successfully fetched school subjects", subjects);
        return subjects;
      }, function(response) {
        $log.warn("Cannot get school subjects " + response);
        return $q.reject(response);
      });
    }

    return School;
  }
])
.factory("Student", ["$http", "$q", "$log", "$rootScope",
  function($http, $q, $log, $rootScope) {
    function Student(apiData) {
      apiData = apiData || {};
      angular.extend(this, apiData);
      if (this.birthdate) {
        this.birthdate = new Date(this.birthdate);
      }
    }
    return Student;
  }
]).factory("Subject", ["$http", "$q", "$log", "$rootScope",
  function($http, $q, $log, $rootScope) {
    function Subject(apiData) {
      apiData = apiData || {};
      angular.extend(this, apiData);
    }
    return Subject;
  }
])
.factory("Payment", ["$http", "$q", "$log", "$rootScope",
  function($http, $q, $log, $rootScope) {
    function Payment(apiData) {
      apiData = apiData || {};
      angular.extend(this, apiData);
      if (this.timestamp) {
        this.timestamp = new Date(this.timestamp);
      }
    }
    return Payment;
  }
])

.controller('SampleAppController', [
  '$scope', '$rootScope', '$log', '$q', 'Auth', 'User',
  function($scope, $rootScope, $log, $q, Auth, User) {
    Auth.$onAuthStateChanged(function(firebaseUser) {
      if (!firebaseUser)
        return;
      $rootScope.currentUser = new User(firebaseUser);

      $rootScope.profilePromise = $rootScope.currentUser.getInfo().then(function(user) {
        $log.info("successfully loaded profile");
        return user;
      }, function(error) {
        $log.error("error loading profile: ", error);
        return $q.reject(error);
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
.controller('LoginModalCtrl', function ($scope, $rootScope, $window, $uibModalInstance, Auth, User) {
  $scope.signIn = function() {
    $scope.currentUser = null;
    $scope.error = null;

    Auth.$signInWithEmailAndPassword($scope.email, $scope.password).then(function(firebaseUser) {
      $rootScope.currentUser = new User(firebaseUser);

      $rootScope.currentUser.getInfo().then(function (profile){
        if (profile.usertype == 'user') {
          $window.location.replace("/payment");
        } else if (profile.usertype = 'school') {
          $window.location.replace("/report");
        }
      }, function(error) {
        $log.error("sign in redirect failed", error);
      })["finally"](function() {
        $uibModalInstance.close();
      });
    }).catch(function(error) {
      $scope.error = error;
    });
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
})
.controller('SignUpModalCtrl', function ($scope, $log, $window, $uibModalInstance, Auth, User) {
  $scope.userType = 'user';

  $scope.createUser = function(userForm) {
    $log.info("create User", userForm);
    $scope.error = null;

    if (userForm.$invalid) {
      $log.info(userForm.$errors);
    }

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
        var profile = new User();
        profile.firstname = $scope.firstName;
        profile.middlename = $scope.middleName ? $scope.middleName : null;
        profile.lastname = $scope.lastName;
        profile.address = $scope.address;
        profile.mobile = $scope.mobileNumber ? $scope.mobileNumber : null;
        profile.landline = $scope.landline ? $scope.landline : null;
        profile.usertype = $scope.userType;

        if(profile.usertype == 'school') {
          profile.schoolName = $scope.schoolName;
          profile.schoolAccount = $scope.schoolAccount;
        }

        profile.saveInfo().then(function() {
          if (profile.usertype == 'user') {
            $window.location.replace("/payment");
          } else if (profile.usertype == 'school') {
            $window.location.replace("/report");
          }
          $uibModalInstance.close();
        }).catch(function(error) {
          $log.error("error saving profile: ", error);
        });
      }, function(error) {
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
.controller('SchoolPaymentsPageCtrl', function ($scope, $log, $rootScope) {
  $rootScope.profilePromise.then(function(user) {
    if (!user)
      return;

    user.getSchoolInfo().then(function(school) {
      school.getPaymentsReceived().then(function(payments) {
        $scope.payments = payments;
      }, function(error) {
        $scope.error = error;
        $log.error(error)
      });
    }, function(error){
      $log.error(error);
    });
  }, function(error) {
    $log.error(error);
  });
})
.controller('SchoolSubjectsPageCtrl', function ($scope, $log, $rootScope) {
  $rootScope.profilePromise.then(function(user) {
    if (!user)
      return;

    user.getSchoolInfo().then(function(school) {
      school.getSubjects().then(function(subjects) {
        $scope.subjects = subjects;
      }, function(error) {
        $scope.error = error;
        $log.error = error;
      })
    }, function(error){
      $log.error(error);
    });
  }, function(error) {
    $log.error(error);
  });
})
.controller('UserPaymentsPageCtrl', function ($scope, $log, $rootScope) {
  $rootScope.profilePromise.then(function(user) {
    if (!user)
      return;

    user.getPaymentsMade().then(function(payments) {
      $scope.payments = payments;
    }, function(error) {
      $scope.error = error;
      $log.error(error);
    });
  }, function(error) {
    $log.error(error);
  });
})
.controller('UserStudentsPageCtrl', function($scope, $log, $rootScope) {
  $rootScope.profilePromise.then(function(user) {
    if (!user)
      return;

    user.getStudents().then(function(students) {
      $scope.students = students;
    }, function(error) {
      $scope.error = error;
      $log.error(error);
    });
  }, function(error) {
    $log.error(error);
  });
})

.controller('ProfilePageCtrl', function ($scope, $rootScope, $log) {
  $rootScope.profilePromise.then(function(user) {
    if (!user)
      return;

    if (user.isTypeSchool()) {
      user.getSchoolInfo().then(function(schoolInfo) {
      }, function(error) {
        $scope.error = error;
        $log.error(error)
      });
    }

  }, function(error) {
    $log.error(error);
  });
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

//modified from angularfire-seed
.config(['$provide', function($provide) {
  // adapt ng-cloak to wait for auth before it does its magic
  $provide.decorator('ngCloakDirective', ['$delegate', '$rootScope', '$parse', 'Auth',
    function($delegate, $rootScope, $parse, Auth) {
      var directive = $delegate[0];
      // make a copy of the old directive
      var _compile = directive.compile;
      directive.compile = function(element, attr) {
        if (attr.ngCloak) {
          var promise = $parse(attr.ngCloak)($rootScope);
          promise.then(function() {
            _compile.call(directive, element, attr);
          });
        } else {
          Auth.$waitForSignIn().then(function() {
            // after auth, run the original ng-cloak directive
            _compile.call(directive, element, attr);
          });
        }
      };
      // return the modified directive
      return $delegate;
    }]);
}])
;

