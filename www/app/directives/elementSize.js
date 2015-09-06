/* globals define, document */
define([
  'app'
], function (app) {
  'use strict';

  app.directive('elementSize', function ($timeout) {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        function resize() {
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
        }

        element.ready(function () {
          resize();
          scope.$on(function () {
            return element[0].offsetHeight;
          }, function (newHeight, oldHeight) {
            if (newHeight !== oldHeight) {
              resize();
            }
          });
          scope.$on(function () {
            return element[0].offsetWidth;
          }, function (newWidth, oldWidth) {
            if (newWidth !== oldWidth) {
              resize();
            }
          });
        });
        // Listen for orientation changes
        window.addEventListener('orientationchange', function() {
          // Announce the new orientation number
          resize();
        }, false);

        // Listen for resize changes
        window.addEventListener('resize', function() {
          // Get screen size (inner/outerWidth, inner/outerHeight)
          resize();
        }, false);
      }
    };
  });
});
