angular.module('sampleApp', ['ui.bootstrap', 'ui.router', 'firebase', 'ipCookie', 'ui.select', 'ngSanitize'])
.constant('moment', moment)
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
  $stateProvider.state('adminPaymentsPage', {
    url: "/allPayments",
    views: {
      "header": {
        templateUrl: "partials/header.html",
        controller: "HeaderController",
        controllerAs: "header"
      },
      "content": {
        templateUrl: "partials/adminPayments.html",
        controller: "AdminPaymentsPageCtrl",
        controllerAs: "adminPayments"
      }
    },
    resolve: {
      "currentAuth": ["Auth", function(Auth) {
        return Auth.$requireSignIn();
      }]
    },
    data: {
      pageId: "admin-payments-page",
      pageTitle: "All Payments"
    }
  });
  $stateProvider.state('adminSchoolsPage', {
    url: "/allSchools",
    views: {
      "header": {
        templateUrl: "partials/header.html",
        controller: "HeaderController",
        controllerAs: "header"
      },
      "content": {
        templateUrl: "partials/adminSchools.html",
        controller: "AdminSchoolsPageCtrl",
        controllerAs: "adminSchools"
      }
    },
    resolve: {
      "currentAuth": ["Auth", function(Auth) {
        return Auth.$requireSignIn();
      }]
    },
    data: {
      pageId: "admin-school-page",
      pageTitle: "All Schools"
    }
  });
  $stateProvider.state('adminStudentsPage', {
    url: "/allStudents",
    views: {
      "header": {
        templateUrl: "partials/header.html",
        controller: "HeaderController",
        controllerAs: "header"
      },
      "content": {
        templateUrl: "partials/adminStudents.html",
        controller: "AdminStudentsPageCtrl",
        controllerAs: "adminStudents"
      }
    },
    resolve: {
      "currentAuth": ["Auth", function(Auth) {
        return Auth.$requireSignIn();
      }]
    },
    data: {
      pageId: "admin-students-page",
      pageTitle: "All Students"
    }
  });
  $stateProvider.state('adminSubjectsPage', {
    url: "/allSubjects",
    views: {
      "header": {
        templateUrl: "partials/header.html",
        controller: "HeaderController",
        controllerAs: "header"
      },
      "content": {
        templateUrl: "partials/adminSubjects.html",
        controller: "AdminSubjectsPageCtrl",
        controllerAs: "adminSubjects"
      }
    },
    resolve: {
      "currentAuth": ["Auth", function(Auth) {
        return Auth.$requireSignIn();
      }]
    },
    data: {
      pageId: "admin-subjects-page",
      pageTitle: "All subjects"
    }
  });
  $stateProvider.state('adminUsersPage', {
    url: "/allUsers",
    views: {
      "header": {
        templateUrl: "partials/header.html",
        controller: "HeaderController",
        controllerAs: "header"
      },
      "content": {
        templateUrl: "partials/adminUsers.html",
        controller: "AdminUsersPageCtrl",
        controllerAs: "adminUsers"
      }
    },
    resolve: {
      "currentAuth": ["Auth", function(Auth) {
        return Auth.$requireSignIn();
      }]
    },
    data: {
      pageId: "admin-users-page",
      pageTitle: "All Users"
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
.factory("Auth", ["$firebaseAuth", "$q", "$http", "$log", "ipCookie", "User",
  function($firebaseAuth, $q, $http, $log, ipCookie, User) {
    // uncomment to user Firebase for session management:
    // return $firebaseAuth();

    // uncomment to mock Firebase for demo if no internet available:
    function Auth() {}
    Auth.userPromise = function() {
      if (ipCookie('USER')) {
        var user = {
          'email': ipCookie('USER')
        };
        console.log("!!! ipCookie", ipCookie('USER'), user);
        return $q.when(user);
      } else {
        console.log("!!! userPromise reject");
        return $q.reject('unauthorized');
      }
    };

    Auth.$requireSignIn = function() {
      console.log("!!! requireSignIn", ipCookie('USER'));
      return Auth.userPromise();
    };

    Auth.$onAuthStateChanged = function(successCallback) {
      console.log("!!! onAuthStateChanged", ipCookie('USER'));
      if (ipCookie('USER')) {
        successCallback({'email': ipCookie('USER')});
      }
    };

    Auth.$signOut = function() {
      console.log("!!! signOut", ipCookie('USER'));
      ipCookie.remove('USER');
      return $q.when(true);
    };

    Auth.$signInWithEmailAndPassword = function(email, password) {
      console.log("!!! signInWithEmailAndPassword", ipCookie('USER'));
      return $http.get("/data/handleData.php", {
        'params': {
          'action': 'login',
          'email': email,
          'pwd': password
        }
      }).then(function(response){
        ipCookie('USER', email);
        return Auth.userPromise();
      }, function(error){
        $log.error("sign in failed", error);
        return $q.reject(error);
      });
    };

    Auth.$createUserWithEmailAndPassword = function(email, password) {
      console.log("!!! createUserWithEmailAndPassword", ipCookie('USER'));
      ipCookie('USER', email);
      return Auth.userPromise();
    };

    Auth.$waitForSignIn = function() {
      console.log("!!! waitForSignIn", ipCookie('USER'));
      return $q.when(true);
    };

    return Auth;
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
    };
    User.prototype.isTypeUser = function() {
      return this.usertype == 'user';
    };
    User.prototype.isTypeAdmin = function() {
      return this.usertype == 'admin';
    };

    User.prototype.getInfo = function() {
      var infoUrl = "/data/handleData.php?utype=user&dtype=info";
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
      var self = this;
      function createUserPromise() {
        return $http.get('/data/handleData.php', {
          'params':{
            'dtype': 'users',
            'action': 'add',
            'data': {
              'password': self.password,
              'firstname': self.firstname,
              'middlename': self.middlename ? self.middlename : null,
              'lastname': self.lastname,
              'address': self.address,
              'mobile': self.mobile ? self.mobile : null,
              'landline': self.landline ? self.landline : null,
              'email': self.email,
              'usertype': self.usertype,
              'sid': self.sid ? self.sid : null
            }
          }
        }).then(function(user) {
          $log.info("successfully added user", user);
          return $q.when(new User(user));
        }, function(error){
          $log.error("can't create user", error);
          return $q.reject(error);
        });
      }

      if (this.isTypeSchool()) {
        return School.saveInfo({
          'name': self.schoolName,
          'accountnum': self.schoolAccount
        }).then(function(school) {
          self.sid = school.sid;
          return createUserPromise();
        }, function(error) {
          $log.error("can't create user becuase can't create school", error);
          return $q.reject(error);
        });
      } else {
        return createUserPromise();
      }
    };

    User.prototype.getSchoolInfo = function() {
      if (!this.isTypeSchool()) {
        return $q.reject("usertype other than 'school' cannot get school info");
      }

      var schoolInfoUrl = "/data/handleData.php?utype=school&dtype=info";
      var params ="&id=" + this.sid;
      return $http.get(schoolInfoUrl+params).then(function(response) {
        $log.info("successfully fetched school info", response.data[0]);
        var school = new School(response.data[0]);
        return school;
      }, function(response) {
        $log.warn("Cannot get school info " + response);
        return $q.reject(response);
      });
    };

    User.prototype.getPaymentsMade = function() {
      var paymentsUrl = "/data/handleData.php?utype=user&dtype=payments";
      var params ="&id=" + this.uid;
      return $http.get(paymentsUrl+params).then(function(response) {
        var i, len, payments = [];
        for (i = 0, len = response.data.length; i < len; i++) {
          payments.push(new Payment(response.data[i]));
        }

        $log.info("successfully fetched user payments", payments);
        return payments;
      }, function(response) {
        $log.warn("Cannot get payments " + response);
        return $q.reject(response);
      });
    };

    User.prototype.getStudents = function() {
      var studentsUrl = "/data/handleData.php?utype=user&dtype=dependents";
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
    };

    User.getAllUsers = function() {
      if (!$rootScope.currentUser.isTypeAdmin()) {
        return $q.reject("access denied");
      }
      var usersUrl = "/data/handleData.php?utype=admin&dtype=users";
      return $http.get(usersUrl).then(function(response) {
        var i, len, users = [];
        for (i = 0, len = response.data.length; i < len; i++) {
          users.push(new User(response.data[i]));
        }

        $log.info("successfully fetched all users", users);
        return users;
      }, function(response) {
        $log.warn("Cannot get all users " + response);
        return $q.reject(response);
      });
    };

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

      var paymentsUrl = "/data/handleData.php?utype=school&dtype=payments";
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
    };

    School.prototype.getSubjects = function() {
      if ($rootScope.currentUser.isTypeUser()){
        return $q.reject("usertype 'user' can't view subjects");
      }

      var subjectsUrl = "/data/handleData.php?utype=school&dtype=subjects";
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
    };

    School.saveInfo = function(params) {
      return $http.get("/data/handleData.php", {
        'params': {
          'data': {
            'name': params.name,
            'accountnum': params.accountnum,
            'defaultpriceperunit': null
          },
          'dtype': 'schools',
          'action': 'add'
        }
      }).then(function(response) {
        $log.info("successfully created school", response.data[0]);
        return new School(response.data[0]);
      }, function(error){
        $log.error("can't create school", error);
        return $q.reject(error);
      });
    };

    School.getAllSchools = function() {
      var schoolsUrl = "/data/handleData.php?utype=admin&dtype=schools";
      return $http.get(schoolsUrl).then(function(response) {
        var i, len, schools = [];
        for (i = 0, len = response.data.length; i < len; i++) {
          schools.push(new School(response.data[i]));
        }

        $log.info("successfully fetched all schools", schools);
        return schools;
      }, function(response) {
        $log.warn("Cannot get all schools " + response);
        return $q.reject(response);
      });
    };

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

    Student.getAllStudents = function() {
      if (!$rootScope.currentUser.isTypeAdmin()) {
        return $q.reject("access denied");
      }
      var studentsUrl = "/data/handleData.php?utype=admin&dtype=students";
      return $http.get(studentsUrl).then(function(response) {
        var i, len, students = [];
        for (i = 0, len = response.data.length; i < len; i++) {
          students.push(new Student(response.data[i]));
        }

        $log.info("successfully fetched all students", students);
        return students;
      }, function(response) {
        $log.warn("Cannot get all students " + response);
        return $q.reject(response);
      });
    };

    Student.addStudent = function(params) {
      return $http.get("/data/handleData.php", {
        'params': {
          'dtype': 'students',
          'action': 'add',
          'data': {
            "uid":params.uid,
            "firstname":params.firstname,
            "middlename":params.middlename,
            "lastname":params.lastname,
            "birthdate":moment(params.birthdate).format("YYYY-MM-DD")
          }
        }
      }).then(function(response) {
        $log.info("successfully added student", response.data[0]);
        return new Student(response.data[0]);
      }, function(error){
        $log.error("cannot add student", error);
        return $q.reject(error);
      });
    };

    Student.editStudent = function(params) {
      return $http.get("/data/handleData.php", {
        'params': {
          'dtype': 'students',
          'action': 'update',
          'data': params
        }
      }).then(function(response) {
        $log.info("successfully edited student", response);
      }, function(error) {
        $log.error("cannot edit student", error);
        return $q.reject(error);
      });
    }

    Student.deleteStudent = function(params) {
      return $http.get("/data/handleData.php", {
        'params': {
          'dtype': 'students',
          'action': 'delete',
          'data': {
            "studid":params.studid
          }
        }
      }).then(function(response) {
        $log.info("successfully deleted student", response);
      }, function(error){
        $log.error("cannot cannot student", error);
        return $q.reject(error);
      });
    }
    return Student;
  }
])
.factory("Subject", ["$http", "$q", "$log", "$rootScope",
  function($http, $q, $log, $rootScope) {
    function Subject(apiData) {
      apiData = apiData || {};
      angular.extend(this, apiData);
    }

    Subject.getAllSubjects = function() {
      var subjectsUrl = "/data/handleData.php?utype=admin&dtype=subjects";
      return $http.get(subjectsUrl).then(function(response) {
        var i, len, subjects = [];
        for (i = 0, len = response.data.length; i < len; i++) {
          subjects.push(new Subject(response.data[i]));
        }

        $log.info("successfully fetched all subjects", subjects);
        return subjects;
      }, function(response) {
        $log.warn("Cannot get all subjects " + response);
        return $q.reject(response);
      });
    };

    Subject.addSubject = function(params) {
      return $http.get("/data/handleData.php", {
        'params': {
          'dtype': 'subjects',
          'action': 'add',
          'data': {
            "sid":params.sid,
            'subname': params.subname,
            'subdesc': params.subdesc,
            'units': params.units,
            'priceperunit': params.priceperunit
          }
        }
      }).then(function(response) {
        $log.info("successfully added subject", response.data[0]);
        return new Subject(response.data[0]);
      }, function(error){
        $log.error("cannot add student", error);
        return $q.reject(error);
      });
    };

    Subject.editSubject = function(params) {
      return $http.get("/data/handleData.php", {
        'params': {
          'dtype': 'subjects',
          'action': 'update',
          'data': params
        }
      }).then(function(response) {
        $log.info("successfully edited student", response);
      }, function(error) {
        $log.error("cannot edit student", error);
        return $q.reject(error);
      });
    }

    Subject.deleteSubject = function(params) {
      return $http.get("/data/handleData.php", {
        'params': {
          'dtype': 'subjects',
          'action': 'delete',
          'data': {
            "subid":params.subid
          }
        }
      }).then(function(response) {
        $log.info("successfully deleted subject", response);
      }, function(error){
        $log.error("cannot cannot subject", error);
        return $q.reject(error);
      });
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

    Payment.getAllPayments = function () {
      if (!$rootScope.currentUser.isTypeAdmin()) {
        return $q.reject("access denied");
      }
      var paymentsUrl = "/data/handleData.php?utype=admin&dtype=payments";
      return $http.get(paymentsUrl).then(function(response) {
        var i, len, payments = [];
        for (i = 0, len = response.data.length; i < len; i++) {
          payments.push(new Payment(response.data[i]));
        }

        $log.info("successfully fetched all subjects", payments);
        return payments;
      }, function(response) {
        $log.warn("Cannot get all subjects " + response);
        return $q.reject(response);
      });
    };

    Payment.addPayment = function(params) {
      return $http.get("/data/handleData.php", {
        'params': {
          'dtype':'payments',
          'action':'add',
          'data':{
            'studid':params.studid,
            "sid":params.sid,
            "timestamp":moment().format("YYYY-MM-DD hh:mm:ss"),
            "schoolperiod":params.schoolperiod,
            "educlevel":params.educlevel,
            "subids":params.subids,
            "totalunits":params.totalunits,
            "fee":params.fee,
            "pstatus":"pending"
          }
        }
      }).then(function(response){
        $log.info("successfully added payment", response.data[0]);
        return new Payment(response.data[0]);
      }, function(error) {
        $log.error("can't create payment", error);
        return $q.reject(error);
      });
    };

    Payment.prototype.updatePaymentStatus = function() {
      var self = this;
      return $http.get("/data/handleData.php", {
        'params': {
          'dtype':'payments',
          'action': 'update',
          'data': {
            "pid": self.pid,
            "pstatus": "paid"
          }
        }
      }).then(function(response) {
        $log.info("successfully updated payment", response);
      }, function(error) {
        return $q.reject(error);
      })
    }
    return Payment;
  }
])
.factory("UnionBank", ["$http", "$q", "$log", "$rootScope",
  function($http, $q, $log, $rootScope) {
    function UnionBank(apiData) {
      apiData = apiData || {};
      angular.extend(this, apiData);
    }
    var self = this;
    this.CLIENT_ID = "546e8d68-32b6-4ce7-b26d-c168cf5c9fcc";
    this.CLIENT_SECRET = "Y3vI3xQ7xU3mV1oG8rT4lY8pL1cF7qH2rU6mJ0lQ3oE2xG5fV5";
    this.CHANNEL_ID = "UHACK_0046";
    this.PROCESSING_FEE_ACCOUNT_NUM = "000000012751";
    this.PROCESSING_FEE_PERCENT = 0.01;
    this.HEADERS = {
      'accept': 'application/json',
      'content-type': 'application/json',
      'x-ibm-client-id': self.CLIENT_ID,
      'x-ibm-client-secret': self.CLIENT_SECRET
    }

    UnionBank.getProcessingFeePercent = function() {
      return self.PROCESSING_FEE_PERCENT;
    }

    UnionBank.queryBalance = function(userAccount) {
      return $http.get("https://api.us.apiconnect.ibmcloud.com/ubpapi-dev/sb/api/RESTs/getAccount",{
        'params': {
          'account_no': userAccount
        },
        'headers': self.HEADERS
      }).then(function(response) {
        if (response.data[0].account_no == null){
          return $q.reject({'code':'unionbank.queryBalance.noAccount', 'message': 'Cannot query balance for account.'});
        } else {
          $log.info("successfully queried balance for account", response.data[0], response.data[0].avaiable_balance); //unionbank API has a typo
          return response.data[0].avaiable_balance;
        }
      }, function(error) {
        return $q.reject(error);
      });
    };

    UnionBank.processPayment = function(payment, userAccount, schoolAccount) {
      var processingFee = parseFloat(payment.fee) * self.PROCESSING_FEE_PERCENT;
      var schoolPayment = parseFloat(payment.fee) * (1 - self.PROCESSING_FEE_PERCENT);

      return UnionBank.processTransaction(payment.pid+"0", schoolPayment, userAccount, schoolAccount).then(function(response){
        $log.info("successfully transferred payment to school", response);
        return UnionBank.processTransaction(payment.pid+"1", processingFee, userAccount, self.PROCESSING_FEE_ACCOUNT_NUM).then(function(response){
          $log.info("successfully transferred processing fee", response);
        }, function(error){
          $log.error(error);
          return $q.reject({'code':'unionbank.processPayment.processFee.error', 'message': 'error transferring processing fee'});
        })
      }, function(error){
        $log.error(error);
        return $q.reject({'code':'unionbank.processPayment.school.error', 'message': 'error transferring payment to school'});
      })
    };

    UnionBank.processTransaction = function(transactionId, fee, sourceAccount, targetAccount) {
      return $http({
        method: 'POST',
        url: "https://api.us.apiconnect.ibmcloud.com/ubpapi-dev/sb/api/RESTs/transfer",
        headers: self.HEADERS,
        data: {
          "channel_id":self.CHANNEL_ID,
          "transaction_id": transactionId,
          "source_account": sourceAccount,
          "target_account": targetAccount,
          "source_currency": "php",
          "target_currency": "php",
          "amount":fee
        }
      }).then(function(response) {
        $log.info("successfully transferred", fee,"from", sourceAccount, "to", "targetAccount");
        return response;
      }, function(error){
        return $q.reject(error);
      });;
    }

    return UnionBank;
  }
])
.factory("Account", ["$http", "$q", "$log", "$rootScope",
  function($http, $q, $log, $rootScope) {
    function Account(apiData) {
      apiData = apiData || {};
      angular.extend(this, apiData);
    }
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
        if (profile.isTypeUser()) {
          $window.location.replace("/payment");
        } else if (profile.isTypeSchool()) {
          $window.location.replace("/report");
        } else if (profile.isTypeAdmin()){
          $window.location.replace("/allPayments");
        }
      }, function(error) {
        $log.error("sign in redirect failed", error);
      })["finally"](function() {
        $uibModalInstance.close();
      });
    }).catch(function(error) {
      $scope.error = { 'code': 'login.error', 'message': 'Wrong email/password combination' };
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
      $scope.error = { 'code': 'password.mismatch', 'message': "Passwords Don't Match" };
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
        profile.password = $scope.password;
        profile.email = $scope.email;

        if(profile.isTypeSchool) {
          profile.schoolName = $scope.schoolName;
          profile.schoolAccount = $scope.schoolAccount;
        }

        profile.saveInfo().then(function() {
          if (profile.isTypeUser()) {
            $window.location.replace("/payment");
          } else if (profile.isTypeSchool()) {
            $window.location.replace("/report");
          }
          $uibModalInstance.close();
        }, function(error) {
          $log.error("error saving profile: ", error);
          $scope.error = {'code': 'user.save.error', 'message': error.data};
          Auth.$signOut();
        });
      }, function(error) {
        $scope.error = { 'code': 'auth.createUserWithEmailAndPassword.error', 'message': error.data };
      });
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
})
.controller('PaymentPageCtrl', function ($scope, $rootScope, $log, $window, School, Subject, Student, Payment, UnionBank, moment) {
  $scope.datepickerOptions = {
    'datepickerMode': 'year',
    'maxDate': new Date()
  };
  $scope.datepickerFormat = 'yyyy-MM-dd';
  $scope.datepickerOpen = true;
  $scope.params = {
    'sid': null,
    'fee': 0,
    'totalunits': 0,
    'pstatus': 'pending'
  };
  $scope.currentSubjectList = [];

  $scope.$watch(function() {
    return $scope.params.sid;
  }, function(sid){
    $scope.currentSubjectList = ($scope.params.sid && $scope.subjectsBySid[sid]) ? $scope.subjectsBySid[sid] : [];
    $scope.params.subjects = [];
  }, true);

  $scope.$watch(function() {
    return $scope.params.subjects;
  }, function(subjects){
    $scope.params.subids = $scope.params.subjects.map(function(a) {return a.subid;}).join();
    if ($scope.params.subjects.length > 0) {
      var feeList = $scope.params.subjects.map(function(a) { return a.priceperunit * a.units; });
      var unitsList = $scope.params.subjects.map(function(a) { return a.units; });
      $scope.params.fee = feeList.reduce(function(a,b) { return a + b; });
      $scope.params.totalunits = unitsList.reduce(function(a,b) { return a + b; });
    }
  }, true);

  $scope.$watch(function() {
    return $scope.params.userAccount;
  }, function(userAccount){
    if (userAccount && userAccount.length >= 12) {
      UnionBank.queryBalance(userAccount).then(function(balance) {
        $scope.userAccountBalance = balance;
      }, function(error){
        $scope.userAccountBalance = null;
        $log.error("error querying balance for account", userAccount, error);
      });
    } else {
      $scope.userAccountBalance = null;
    }
  });

  School.getAllSchools().then(function(schools) {
    $scope.schools = schools;

    Subject.getAllSubjects().then(function(subjects) {
      $scope.subjectsBySid = {};
      var i, len;
      for (i = 0, len = subjects.length; i < len; i++) {
        if (!(subjects[i].sid in $scope.subjectsBySid)) {
          $scope.subjectsBySid[subjects[i].sid] = [];
        }
        $scope.subjectsBySid[subjects[i].sid].push(subjects[i]);
      }

    }, function(error) {
      $scope.error = { 'code': 'subject.allSubjects.error', 'message': error.data };
      $log.error(error);
    });
  }, function(error){
    $log.error = error;
  });

  $rootScope.profilePromise.then(function(user) {
    if (!user)
      return;

    user.getStudents().then(function(students) {
      $scope.students = students;
      if (students) {
        $scope.dependentMode = 'select';
      } else {
        $scope.dependentMode = 'add';
      }
    }, function(error) {
      $scope.error = {'code': 'user.getStudents.error','message': error.data};
      $log.error(error);
    });
  }, function(error) {
    $log.error(error);
  });

  function createPaymentPromise() {
    var i, len, selectedSchool;
    for (i = 0, len = $scope.schools.length; i < len; i++) {
      if ($scope.schools[i].sid == $scope.params.sid) {
        selectedSchool = $scope.schools[i];
        break;
      }
    }
    if (!selectedSchool) {
      return $q.reject({'code': 'createPaymentPromise.error', 'message': 'no school selected'});
    }
    return Payment.addPayment($scope.params).then(function(payment){
      UnionBank.processPayment(payment, $scope.params.userAccount, selectedSchool.accountnum).then(function(response) {
        payment.updatePaymentStatus().then(function(response){
          $log.info("update payment success", response);
          $window.location.replace("/payments");
        }, function(error){
          $log.error(error);
        });
      }, function(error) {
        $log.error("error processing unionbank payments", error);
        $scope.error = {'code': 'unionbank.processPayment.error', 'message': error.message};
      });

    }, function(error) {
      $scope.error = {'code': 'payment.addPayment.error','message': error.data};
      $log.error(error);
    });
  }

  $scope.submitPayment = function(form) {
    if (!$scope.params.subjects.length) {
      $scope.error = {'code': 'submitPayment.error','message': 'No Subjects Selected'};
      return;
    }
    if ($scope.dependentMode=='add') {
      Student.addStudent({
        'uid': $rootScope.currentUser.uid,
        'firstname': $scope.params.firstname,
        'middlename': $scope.params.middlename,
        'lastname': $scope.params.lastname,
        'birthdate': $scope.params.birthdate
      }).then(function(student) {
        $scope.params.studid = student.studid;
        createPaymentPromise();
      }, function(error){
        $log.error("can't create student", error);
        $scope.error = {'code': 'student.addStudent.error','message': error.data};
      });
    } else {
      createPaymentPromise();
    }
  };
})
.controller('LandingPageCtrl', function ($scope) {

})
.controller('SchoolPaymentsPageCtrl', function ($scope, $log, $rootScope) {
  $rootScope.profilePromise.then(function(user) {
    if (!user)
      return;

    user.getSchoolInfo().then(function(school) {
      $rootScope.currentUser.school = school;
      school.getPaymentsReceived().then(function(payments) {
        $scope.payments = payments;
      }, function(error) {
        $scope.error = error;
        $log.error(error);
      });
    }, function(error){
      $log.error(error);
    });
  }, function(error) {
    $log.error(error);
  });
})
.controller('SchoolSubjectsPageCtrl', function ($scope, $log, $window, $rootScope, Subject, UnionBank) {
  $scope.showForm=false;
  $scope.action='add';
  $scope.paymentReceived = 0;
  $scope.processingFee = 0;
  $scope.params = {};

  $scope.$watch(function() {
    return $scope.params.priceperunit;
  },function(priceperunit) {
    $scope.paymentReceived = priceperunit * (1 - UnionBank.getProcessingFeePercent());
    $scope.processingFee = priceperunit * UnionBank.getProcessingFeePercent();
  });

  $scope.submitForm = function() {
    if ($scope.action=='add') {
      Subject.addSubject($scope.params).then(function(response) {
        $scope.refresh();
      }, function(error){
        $log.error(error);
        $scope.error={'code':'addSubject.error', 'message': 'Cannot Add Subject. Please check your form and try again'};
      });
    } else {
      Subject.editSubject($scope.params).then(function(response) {
        $scope.refresh();
      }, function(error) {
        $log.error(error);
        $scope.error={'code':'editSubject.error', 'message': 'Cannot Edit Subject. Please check your form and try again'};
      });
    }
  };

  $scope.refresh = function() {
    $rootScope.currentUser.school.getSubjects().then(function(subjects) {
      $scope.clearParams();
      $scope.showForm=false;
      $scope.subjects = subjects;
    }, function(error) {
      $scope.error = error;
      $log.error = error;
    });
  }

  $scope.clearParams = function() {
    $scope.params = {
      'sid': $rootScope.currentUser.school.sid
    }
  };

  $scope.loadParams = function(subject) {
    $scope.params = {
      'sid': $rootScope.currentUser.school.sid,
      'subname': subject.subname,
      'subdesc': subject.subdesc,
      'units': subject.units,
      'priceperunit': subject.priceperunit
    }
  };

  $scope.clickAdd = function() {
    $scope.action = 'add';
    $scope.clearParams();
    $scope.showForm=!$scope.showForm;
  }

  $scope.clickEdit = function(subject) {
    $scope.action = 'edit';
    $scope.loadParams(subject);
    $scope.params.subid = subject.subid;
    $scope.showForm=true;
  }

  $scope.clickDelete = function(subject) {
    var confirm = $window.confirm("Are you sure you want to delete "+subject.subname+"?");
    if (confirm) {
      Subject.deleteSubject(subject).then(function(response) {
        $scope.refresh();
      }, function(error){
        $log.error(error);
        $scope.error={'code':'delete.error', 'message': 'Cannot Delete Subject. Please try again later'};
      })
    }
  }

  $rootScope.profilePromise.then(function(user) {
    if (!user)
      return;

    user.getSchoolInfo().then(function(school) {
      $rootScope.currentUser.school = school;
      $scope.clearParams();
      $scope.refresh();
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
.controller('UserStudentsPageCtrl', function($scope, $log, $window, $rootScope, Student) {
  $scope.showForm=false;
  $scope.action='add';

  $scope.submitForm = function() {
    if ($scope.action=='add') {
      Student.addStudent($scope.params).then(function(response) {
        $scope.refresh();
      }, function(error){
        $log.error(error);
        $scope.error={'code':'addStudent.error', 'message': 'Cannot Add Dependent. Please check your form and try again'};
      });
    } else {
      Student.editStudent($scope.params).then(function(response) {
        $scope.refresh();
      }, function(error) {
        $log.error(error);
        $scope.error={'code':'editStudent.error', 'message': 'Cannot Edit Dependent. Please check your form and try again'};
      })
    }
  };

  $scope.refresh = function() {
    $rootScope.currentUser.getStudents().then(function(students) {
      $scope.students = students;
      $scope.clearParams();
      $scope.showForm=false;
    });
  }

  $scope.clearParams = function() {
    $scope.params = {
      'uid': $rootScope.currentUser.uid
    }
  };

  $scope.loadParams = function(student) {
    $scope.params = {
      'uid': $rootScope.currentUser.uid,
      'firstname': student.firstname,
      'middlename': student.middlename,
      'lastname': student.lastname,
      'birthdate': student.birthdate
    }
  };

  $scope.clickAdd = function() {
    $scope.action = 'add';
    $scope.clearParams();
    $scope.showForm=!$scope.showForm;
  }

  $scope.clickEdit = function(student) {
    $scope.action = 'edit';
    $scope.loadParams(student);
    $scope.params.studid = student.studid;
    $scope.showForm=true;
  }

  $scope.clickDelete = function(student) {
    var confirm = $window.confirm("Are you sure you want to delete "+student.firstname+" "+student.middlename+" "+student.lastname+"?");
    if (confirm) {
      Student.deleteStudent(student).then(function(response) {
        $scope.refresh();
      }, function(error){
        $log.error(error);
        $scope.error={'code':'delete.error', 'message': 'Cannot Delete Dependent. Please try again later'};
      })
    }
  }

  $rootScope.profilePromise.then(function(user) {
    if (!user)
      return;

    $scope.clearParams();
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
.controller('AdminPaymentsPageCtrl', function($scope, $log, $rootScope, Payment, UnionBank) {
  $scope.totalRevenue = 0;

  $rootScope.profilePromise.then(function(user) {
    if (!user || !user.isTypeAdmin()) {
      $scope.error = "access denied";
      return;
    }

    Payment.getAllPayments().then(function(payments) {
      $scope.payments = payments;
      if ($scope.payments.length > 0) {
        var i, len;
        for (i = 0, len = $scope.payments.length; i < len; i++) {
          if ($scope.payments[i].pstatus=='paid') {
            $scope.payments[i].processingFee = $scope.payments[i].fee * UnionBank.getProcessingFeePercent();
            $scope.totalRevenue += $scope.payments[i].processingFee;
          } else {
            $scope.payments[i].processingFee = 0;
          }
        }
      }
    }, function(error) {
      $scope.error = error;
      $log.error(error);
    });
  }, function(error) {
    $log.error(error);
  });
})
.controller('AdminSchoolsPageCtrl', function($scope, $log, $rootScope, School) {
  $rootScope.profilePromise.then(function(user) {
    if (!user || !user.isTypeAdmin()) {
      $scope.error = "access denied";
      return;
    }

    School.getAllSchools().then(function(schools) {
      $scope.schools = schools;
    }, function(error) {
      $scope.error = error;
      $log.error(error);
    });
  }, function(error) {
    $log.error(error);
  });
})
.controller('AdminStudentsPageCtrl', function($scope, $log, $rootScope, Student) {
  $rootScope.profilePromise.then(function(user) {
    if (!user || !user.isTypeAdmin()) {
      $scope.error = "access denied";
      return;
    }

    Student.getAllStudents().then(function(students) {
      $scope.students = students;
    }, function(error) {
      $scope.error = error;
      $log.error(error);
    });
  }, function(error) {
    $log.error(error);
  });
})
.controller('AdminSubjectsPageCtrl', function($scope, $log, $rootScope, Subject) {
  $rootScope.profilePromise.then(function(user) {
    if (!user || !user.isTypeAdmin()) {
      $scope.error = "access denied";
      return;
    }

    Subject.getAllSubjects().then(function(subjects) {
      $scope.subjects = subjects;
    }, function(error) {
      $scope.error = error;
      $log.error(error);
    });
  }, function(error) {
    $log.error(error);
  });
})
.controller('AdminUsersPageCtrl', function($scope, $log, $rootScope, User) {
  $rootScope.profilePromise.then(function(user) {
    if (!user || !user.isTypeAdmin()) {
      $scope.error = "access denied";
      return;
    }

    User.getAllUsers().then(function(users) {
      $scope.users = users;
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
        $rootScope.currentUser.school = school;
      }, function(error) {
        $scope.error = error;
        $log.error(error);
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

