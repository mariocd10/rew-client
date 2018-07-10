'use strict';

/**
 * @ngdoc directive
 * @name clientApp.directive:uploadImgDir
 * @description
 * # uploadImgDir
 */
angular.module('clientApp')
  .directive('uploadImgDir', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the uploadImgDir directive');
      }
    };
  });
