var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ReviewSchema = mongoose.Schema({
    recipe: {type: Schema.ObjectId, ref: 'Recipe'},
    user: {type: Schema.ObjectId, ref: 'User'}
});

var Review = module.exports = mongoose.model('Review', ReviewSchema);
