var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RecipeSchema = mongoose.Schema({
    UserId: {type: Schema.ObjectId, ref: 'User'},
    food_name: {type: String},
    recipe: {type: String},
    date: {type: Date}
});

var Recipe = module.exports = mongoose.model('Recipe', RecipeSchema);

module.exports.createRecipe = function(newRecipe, callback){
    newRecipe.save(callback);
};

module.exports.findRecipeByUserId = function(userId, callback){
    Recipe.findById(id, callback);
};