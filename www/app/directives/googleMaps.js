/* globals define, document */
define([
  'app'
], function (app) {
  'use strict';

  app.directive('googleMap', [
    '$rootScope',
    '$state',
    '$window',
    function ($rootScope, $state, $window) {
      return {
        scope: true,
        restrict: 'A',
        link: function (scope, element) {
          var map = new $window.google.maps.Map(element[0], {
                  zoom: 13,
                  disableDefaultUI: true
              }),
              markers = [];

          function addClick(marker, id) {
            $window.google.maps.event.addListener(marker, 'click', function () {
              $state.go('app.detail', {
                id: id
              });
            });
          }

          function makeMarkers(events) {
            if (!events) {
              return;
            }

            var i = 0,
                mapsMarker;
            for (i; i < events.length; i = i + 1) {
              mapsMarker = new $window.google.maps.Marker({
                  position: new $window.google.maps.LatLng(events[i].lat, events[i].lng),
                  map: map,
                  clickable: true
              });

              markers.push(mapsMarker);
              // center on first hit
              if (!i) {
                map.setCenter(mapsMarker.getPosition());
              }
              addClick(mapsMarker, events[i].id);
            }
          }

          function removeMarkers() {
            for (var i = 0; i < markers.length; i++ ) {
              markers[i].setMap(null);
            }
            markers.length = 0;
          }

          scope.$on('updateMap', function (event, events) {
              removeMarkers();
              makeMarkers(events);
          });
        }
      };
    }
  ]);
});
