(function () {
    'use strict';

    angular
        .module("learnApp", ['ui.router'])
        .config(config)
        .run();

    function config($stateProvider, $urlRouterProvider) {
        // default route
        $urlRouterProvider.otherwise("/");

        // app routes
        $stateProvider
            .state('home', {
                url: '/?searchString',
                templateUrl: 'forms/category/category-view.html',
                controller: 'categoryController',
                controllerAs: 'catCtrl'
            })
            .state('lesson', {
                url: '/:id/lesson/?searchString',
                templateUrl: 'forms/lesson/lesson-view.html',
                controller: 'lessonController',
                controllerAs: 'lessonCtrl'
            })
            .state('card', {
                url: '/card',
                templateUrl: 'forms/card/card-view.html',
                controller: 'cardController',
                controllerAs: 'cardCtrl'
            });
    }

    function run() {
    }
})();