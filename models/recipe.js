var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RecipeSchema = mongoose.Schema({
    UserId: {type: Schema.ObjectId, ref: 'User'},
    title: {type: String},
    ingredients: {type: String},
    preparation: {type: String},
    cooking_time: {type: String},
    difficulty: {type: String},
    image_path: {type: String},
    posting_date: {type: Date}
});

var Recipe = module.exports = mongoose.model('Recipe', RecipeSchema);

module.exports.createRecipe = function(newRecipe, callback){
    newRecipe.save(callback);
};

module.exports.findRecipeByUserId = function(userId, callback){
    Recipe.findById(id, callback);
};