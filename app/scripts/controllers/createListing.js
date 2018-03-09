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
	var dt = new Date();
	var utcDate = dt.toUTCString();
	$scope.create = function() {
    var payload = {
      street_name 	: $scope.streetName,
      street_number	: $scope.streetNumber,
      street_type 	: $scope.streetType,
      apt_number 	: $scope.aptNumber,
      city 			: $scope.city,
      state		 	: $scope.state,
      zip_code 		: $scope.zipCode,
      description 	: $scope.description,
      bedrooms 		: $scope.bedrooms,
      bathrooms 	: $scope.bathrooms,
      home_square_feet 		: $scope.homeSqft,
      land_square_feet 		: $scope.landSqft,
      sale_type 		: $scope.saleType,
      year_built 		: $scope.yrBuilt,
      market_date 	: $scope.utcDate,
      property_type 		: $scope.propType,
      finished_basement : $scope.finishedBasement,
      price 		: $scope.price,
      is_active 		: $scope.isActive
    };

    $http.post('app/createListing', payload)
        .then(function(success, data){
          $log.debug(data);
        });
  };
});
