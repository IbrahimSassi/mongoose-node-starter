var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Comment = new Schema({
    title:String
});
;

module.exports = mongoose.model('comments',Comment);