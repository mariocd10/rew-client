'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:createListingCtrl
 * @description
 * # createListingCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
.controller('createListingCtrl', function ($scope, $http, $log, alertService) {
	
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
    	.then(function(response){
    		$log.debug(response.data);
    	})
    	.catch(function(e){
    		console.log(e.data);
    		if(e.status === 400){
    			angular.forEach(e.data, function(value, key){
    				if(key === 'street_name' || key === 'street_number' || key === 'street_type' || key === 'city' || key === 'state' ||
    						key === 'zip_code' || key === 'description' || key === 'bedrooms' ||key === 'bathrooms' || key === 'home_square_feet' ||
    						key === 'land_square_feet' || key === 'sale_type' || key === 'year_built' || key === 'property_type' || key === 'price'){
    					alertService.add('danger', key+ ':' + value);
    				}
    				else{
            			alertService.add('danger', value[0]);
    				}
        		});
    		}
    		if(e.status === 500){
    			alertService.add('error', 'Internal Server Error!');
    		}
    	});
  };
});
