"use strict"

angular.module('elaMain', ['ngRoute'])

  .controller('navCtrl', ['$scope', '$location', function ($scope, $location) {
    $scope.navClass = function (page) {
        var currentRoute = $location.path().substring(1) || 'home';
        return page === currentRoute ? 'active' : '';
    };

    $scope.selectList = function(el,ev){
      console.log(el)
      console.log(ev)
    }        
  }])

  .controller('homeControl', ['$scope', function ($scope) {
      $scope.todoList = [];
  }])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/input', {
        templateUrl: '/input.html'
      })
      .when('/', {
        templateUrl: '/home.html',
        controller: 'homeControl'
      });
  }]);

angular.module('fileUpload', ['ngFileUpload'])

.controller('MyCtrl', ['$scope', 'Upload', '$timeout', function ($scope, Upload, $timeout) {
    $scope.uploadPic = function(file) {
    file.upload = Upload.upload({
      url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
      data: {file: file},
    });

    file.upload.then(function (response) {
      $timeout(function () {
        file.result = response.data;
      });
    }, function (response) {
      if (response.status > 0)
        $scope.errorMsg = response.status + ': ' + response.data;
    }, function (evt) {
      // Math.min is to fix IE which reports 200% sometimes
      file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
    });
    }
}]);

angular.module("uploadApp", ["elaMain", "fileUpload"]);