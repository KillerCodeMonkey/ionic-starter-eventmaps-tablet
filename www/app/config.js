define([
  'app'
], function (app) {
  'use strict';
  app.config([
    '$ionicConfigProvider',
    function ($ionicConfigProvider) {
      $ionicConfigProvider.navBar.alignTitle('center');
    }
  ]);
});
