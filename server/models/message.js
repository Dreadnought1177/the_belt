
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var messageSchema = new mongoose.Schema({
    _user: {type: Schema.Types.ObjectId, ref: 'User'},
    _topic:{type:Schema.Types.ObjectId, ref:'Topic'},
    message: { type: String, required: true, minlength:5},
    count_one: {type: Number, default:0},
    detail: { type: String, required: true},
    comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
});

mongoose.model('Message', messageSchema);
