define([
  'app',
  'services/event',
  'directives/googleMaps'
], function (app) {
  'use strict';

  app.controller('ResultsCtrl', [
    '$scope',
    '$rootScope',
    '$stateParams',
    '$state',
    '$timeout',
    '$ionicHistory',
    'eventService',
    function ($scope, $rootScope, $stateParams, $state, $timeout, $ionicHistory, eventService) {
      var first = true;
      $scope.limit = 10;
      $scope.show = {
        list: true
      };

      function updateMap() {
        $rootScope.$broadcast('updateMap', $scope.events);
      }

      // show next 10
      $scope.loadMore = function () {
        if (!first) {
          $timeout(function () {
            $scope.limit += 10;
            $scope.$broadcast('scroll.infiniteScrollComplete');
          }, 2000);
          return;
        }
        first = false;

        var wheelChair = $stateParams.wheelChair === 'true',
            wheelChairLift = $stateParams.wheelChairLift === 'true',
            search = $stateParams.search;

        if (wheelChair !== $scope.wheelChair || wheelChairLift !== $scope.wheelChairLift || search !== $scope.search) {
          $scope.wheelChair = wheelChair;
          $scope.wheelChairLift = wheelChairLift;
          $scope.search = search;
          $scope.loading = true;
          eventService.search(search, wheelChair, wheelChairLift).then(function (events) {
            $scope.limit = 10;
            $scope.events = events;
            updateMap();
          }).finally(function () {
            $scope.loading = false;
            $scope.$broadcast('scroll.infiniteScrollComplete');
          });
        } else {
          $scope.$broadcast('scroll.infiniteScrollComplete');
        }
      };

      $scope.reload = function () {
        $scope.loading = true;
        eventService.search($scope.search, $scope.wheelChair, $scope.wheelChairLift).then(function (events) {
          $scope.limit = 10;
          $scope.events = events;
          updateMap();
        }).finally(function () {
          $scope.loading = false;
          $scope.$broadcast('scroll.refreshComplete');
        });
      };
    }
  ]);
});
