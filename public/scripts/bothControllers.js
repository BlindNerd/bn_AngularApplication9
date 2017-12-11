!function () {

'use strict';

angular
.module('app') // continuation of app from main app under app.js

  .controller('RecipesController', function($scope, $location, dataService){
   // get all data from the dataService for the RecipesController
     dataService.recipes((response) => $scope.recipes = response.data);
     dataService.categories((response) => $scope.categories = response.data);
     dataService.fooditems((response) => $scope.fooditems = response.data);

   // create a function to change the view
  $scope.view = (path) => $location.path(path);

  // get recipes by id
     $scope.getRecipeById = (id, response) => {
              dataService.getRecipeById(id);
                   $scope.recipeById = response.data;
                 };// end of get recipe by id

  // bring selet categories over from dataService
  $scope.getRecipeByCategory = (category) => {
               if(!category.name){
                  dataService.recipes((response) => $scope.recipes = response.data);
               }else{
                 dataService.getRecipesByCategory(category, (response) => $scope.recipes = response.data);
               } // end of if else
                }; // end of get recipe by category

        // bring delete into the $scope from data and in real time delete from the ui services
      $scope.deleteRecipes = (recipe, $index) => {
        if (confirm("Are you sure you would like to DELETE " + recipe.name + "?")) {
          dataService.deleteRecipes(recipe);
          $scope.recipes.splice($index, 1)
        } // end of if statement
              }; // end of delete

    // end of RecipesController

             // Recipe Detail Controller
   // method chaining the controllers together   ||  dependentcy injection of services
}).controller('RecipeDetailController', function($scope, $location, $routeParams, dataService){

  // add variable to store the new data making sure to keep it inside the scope
      $scope.recipe = { };
       // ingredients are an array of objects
      $scope.recipe.ingredients = [ ];
       // description is an array of objects
      $scope.recipe.steps = [ ];

  // get all data from the dataService for the RecipeDetailController
    dataService.recipes((response) => $scope.recipes = response.data);
    dataService.categories((response) => $scope.categories = response.data);
    dataService.fooditems((response) => $scope.fooditems = response.data);

   // create a function to change the view for the RecipeDetailController
    $scope.view = (path) => $location.path(path);

 // if the user selects the edit button it populates the modal with the data of the editing recipe
if ($location.$$path === '/edit/' + $routeParams.id) {
    dataService.recipesById($routeParams.id, (response) => {
      $scope.recipe = response.data;
  });
}
   // add the update and save recipe function from the dataService since they are on the same button
   $scope.saveOrUpdate = (recipe) => {
                        if(!recipe._id){
                           dataService.saveRecipe(recipe);
                          }else{
                           dataService.updateRecipe(recipe);
                          }
                              $location.path('/'); // send the users home either way
                            }; // end of save or update

        // add functionality to add an ingredient
  $scope.addIngredients = (ingredient) => {
                   ingredient = { }; // had to make ingredient an empty object to bind with the $scope properly
            $scope.recipe.ingredients.push(ingredient);
  }; // end of add ingredient

      // add delete functionality to the ingredients
  $scope.deleteIngredients = (ingredient, $index) => $scope.recipe.ingredients.splice($index, 1);

     // add functionality to delete a step
  $scope.deleteStep = (step, $index) => $scope.recipe.steps.splice($index, 1);

      // add functionality to add a step to the detail page
  $scope.addStep = (step) => {
        step = { description: 'Add a new step here' }
          $scope.recipe.steps.push(step);
             };// end of add step

});// end of delete controller

}(); // end of iffy
