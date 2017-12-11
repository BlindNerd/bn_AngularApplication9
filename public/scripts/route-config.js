
(function() {
  'use strict';

  angular
    .module('app')
    .config(config);

  function config($routeProvider) {
    $routeProvider
      .when('/', {
        controller: 'RecipesController',
        controllerAs: 'vm',
        templateUrl: 'templates/recipes.html',
        replace: 'true'
      })
      .when('/edit/:id', {
        controller: 'RecipeDetailController',
        controllerAs: 'vm',
        templateUrl: 'templates/recipe-detail.html',
        replace: 'true'
      })
      .when('/add', {
        controller: 'RecipeDetailController',
        controllerAs: 'vm',
        templateUrl: 'templates/recipe-detail.html',
        replace: 'true'
      })
      .otherwise({
        redirectTo: '/'
      });
  }
})();
