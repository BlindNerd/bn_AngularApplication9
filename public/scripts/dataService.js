!function () {

'use strict';

angular.module('app')
       .service('dataService', function($http){

    // GET /api/recipes - Gets all of the recipes.
   this.recipes = function(callback){
              $http.get('/api/recipes')
                   .then(callback);
                  };// end of get recipes

    // GET /api/categories - Gets all of the categories.
    this.categories = function(callback){
                  $http.get('/api/categories')
                       .then(callback);
                  };// end of get categories

    // GET /api/fooditems - Gets all of the food items.
    this.fooditems = function(callback){
                $http.get('/api/fooditems')
                     .then(callback);
                  };// end of get fooditems

    // GET /api/recipes?category={category} - Gets all of the recipes for the specified category.
    this.getRecipesByCategory = function(category, callback){
                        $http.get('/api/recipes?category=' + category.name)
                             .then(callback);
                  };// end of category search

    // GET /api/recipes/{id} - Gets the recipe for the specified ID.
    this.recipesById = function(id, callback){
                $http.get('/api/recipes/' + id)
                     .then(callback);
                  };// end of get recipesById

    // PUT /api/recipes/{id} - Updates the recipe for the specified ID.
    this.updateRecipe = function(recipe){
                    console.log(recipe.name + ' is updated!');
                    $http.put('/api/recipes/' + recipe._id, recipe);
                  };// end of update recipe

    // POST /api/recipes - Adds a recipe.
    this.saveRecipe = function(recipe){
      console.log(recipe.name + ' is saved!');
                $http.post('/api/recipes', recipe)
                  };// end of save recipe

    // DELETE /api/recipes/{id} - Deletes the recipe for the specified ID.
    this.deleteRecipes = function(recipe){
                  $http.delete('/api/recipes/' + recipe._id);
                  console.log("The " + recipe.name + " has just been deleted.");
                  };// end of delete recipe

  });// end of dataService


}();// end of iffy
