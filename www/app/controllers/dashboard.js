define([
  'app',
  'services/event'
], function (app) {
  'use strict';

  app.controller('DashboardCtrl', [
    '$scope',
    '$rootScope',
    '$state',
    'eventService',
    function ($scope, $rootScope, $state, eventService) {
      $scope.search = {};
      $scope.goToList = function () {
        $state.go('app.results', {
          search: $scope.search.string,
          satTrans: $scope.search.satTrans,
          wheelChair: $scope.search.wheelChair,
          wheelChairLift: $scope.search.wheelChairLift
        });
      };

      function updateMap() {
        $rootScope.$broadcast('updateMap', $scope.events);
      }

      $scope.loading = true;
      eventService.getNext().then(function (events) {
        $scope.events = events;
        updateMap();
      }).finally(function () {
        $scope.loading = false;
      });
    }
  ]);
});
