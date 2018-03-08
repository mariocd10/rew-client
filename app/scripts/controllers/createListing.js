'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:createListingCtrl
 * @description
 * # createListingCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
.controller('createListingCtrl', function ($scope, $http, $log) {
  $scope.signup = function() {
    var payload = {
      streetName : $scope.streetName,
      StreetNumber : $scope.streetNumber
    };

    $http.post('app/createListing', payload)
        .success(function(data) {
          $log.debug(data);
        });
  };
});
