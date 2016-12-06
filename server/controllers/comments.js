console.log('users controller');

var mongoose = require('mongoose');
var Comment = mongoose.model('Comment');
var Message = mongoose.model('Message');


function commentsController(){
    this.create = function(req,res){
        var newComment = new Comment(req.body);
        newComment._user = req.session.userId;
        newComment._message = req.params.id;
        newComment.save(function(err,results){
            if(err){
                res.json(err)
            }else{
                console.log('added a comment')
                Message.findOne({_id: req.params.id}).exec(function(err, message){
                    if(err){
                        res.json(err)
                    }else{
                        message.comments.push(newComment._id)
                        message.save(function(err,results){
                            if(err){
                                res.json(err)
                            }else{
                                console.log('we made it fam')
                                res.sendStatus(200);
                            }
                        })
                    }
                })
            }
        })
    };
};

module.exports = new commentsController();

