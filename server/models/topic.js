var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var topicSchema = new mongoose.Schema({
    topic: {type: String, required: true, minlength:10},
    description:{type: String, required: true},
    created_at:{type:Date},
    _user: {type: Schema.Types.ObjectId, ref: 'User'},
    _messages: [{type: Schema.Types.ObjectId, ref: 'Message'}]
    // timestamps:{
    //     createdAt: 'created_at',
    //     updatedAt:'updated_at'
    // }
},{
    timestamps: true
});

mongoose.model('Topic', topicSchema);
