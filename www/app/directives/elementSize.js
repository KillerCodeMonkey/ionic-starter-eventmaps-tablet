/* globals define, document */
define([
  'app'
], function (app) {
  'use strict';

  app.directive('elementSize', function ($timeout) {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        element.ready(function () {
          var height,
              width;
          $timeout(function () {
            height = element[0].offsetHeight;
            width = element[0].offsetWidth;
            if (attrs.key) {
              scope[attrs.key] = {
                height: height,
                width: width
              };
              return;
            }

            scope.elementSize = {
              height: height,
              width: width
            };
          });
        });
      }
    };
  });
});
