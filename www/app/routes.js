define([
  'app',
  // Load Controllers here
  'controllers/app',
  'controllers/dashboard',
  'controllers/results',
  'controllers/detail'
], function (app) {
  'use strict';
  // definition of routes
  app.config([
    '$stateProvider',
    '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
      // url routes/states
      $urlRouterProvider.otherwise('dashboard');

      $stateProvider
        // app states
        .state('app', {
          url: '/',
          controller: 'AppCtrl',
          templateUrl: 'app/templates/base.html'
        })
        .state('app.dashboard', {
          url: 'dashboard',
          templateUrl: 'app/templates/dashboard.html',
          controller: 'DashboardCtrl'
        })
        .state('app.results', {
          url: 'results/:search/:satTrans/:wheelChair/:wheelChairLift',
          controller: 'ResultsCtrl',
          templateUrl: 'app/templates/results.html'
        })
        .state('app.detail', {
          url: 'detail/:id',
          controller: 'DetailCtrl',
          templateUrl: 'app/templates/detail.html'
        });
    }
  ]);
});
