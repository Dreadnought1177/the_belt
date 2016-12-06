var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = new mongoose.Schema({
    comment: { type: String, required: true},
    _message: {type: Schema.Types.ObjectId, ref: 'Message'},
    _user: {type: Schema.Types.ObjectId, ref: 'User'}
});

mongoose.model('Comment', CommentSchema);
var Comment = mongoose.model('Comment', CommentSchema)
