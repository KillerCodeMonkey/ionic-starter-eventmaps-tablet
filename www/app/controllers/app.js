define([
  'app',
  'directives/elementSize',
  'directives/googleMaps',
  'services/page'
], function (app) {
  'use strict';

  app.controller('AppCtrl', [
    '$scope',
    '$ionicModal',
    '$window',
    '$ionicScrollDelegate',
    '$sce',
    'pageService',
    function ($scope, $ionicModal, $window, $ionicScrollDelegate, $sce, pageService) {
      $scope.ready = true;
      $scope.dashboard = 1;

      $scope.back = function () {
        $window.history.back();
      };

      $scope.$on('$stateChangeStart', function () {
        $scope.dashboard = 0;
      });

      $scope.$on('$stateChangeSuccess', function (event, toState) {
        if (toState.name === 'app.dashboard') {
          $scope.dashboard = 1;
        } else {
          $scope.dashboard = 2;
        }
        $ionicScrollDelegate.resize();
        $ionicScrollDelegate.scrollTop();
      });

      pageService.get().then(function (pages) {
        $scope.pages = pages;
      });

      $ionicModal.fromTemplateUrl('app/templates/page.html', {
        scope: $scope
      }).then(function (modal) {
        $scope.modal = modal;
      });

      $scope.openModal = function (index) {
        var notEqual = index !== $scope.currentPage;
        if (notEqual) {
          $scope.opening = true;
          $scope.currentPage = index;
        }
        $scope.modal.show().then(function () {
          if (notEqual) {
            $ionicScrollDelegate.$getByHandle('modal').scrollTop();
          }
          $scope.opening = false;
        });
      };

      $scope.trustHtml = function (html) {
        return $sce.trustAsHtml(html);
      };

      $scope.closeModal = function () {
        $scope.modal.hide();
      };
    }
  ]);
});
