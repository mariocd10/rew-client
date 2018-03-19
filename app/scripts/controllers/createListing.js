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
	
	var d = new Date();
	d = d.getFullYear() + "-"
		+ ('0' + (d.getMonth() + 1)).slice(-2) 
		+ "-" + ('0' + d.getDate()).slice(-2) 
		+ " " + ('0' + d.getHours()).slice(-2) 
		+ ":" + ('0' + d.getMinutes()).slice(-2) 
		+ ":" + ('0' + d.getSeconds()).slice(-2);
	
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
      home_square_feet 	: $scope.homeSqft,
      land_square_feet 	: $scope.landSqft,
      sale_type 		: $scope.saleType,
      year_built 		: $scope.yrBuilt,
      property_type 	: $scope.propType,
      finished_basement : $scope.finishedBasement,
      price 			: $scope.price,
      is_active 		: $scope.isActive,
      market_date		: d
    };

    $http.post('app/createListing', payload)
        .then(function(success, data){
          $log.debug(data);
        });
  };
});
