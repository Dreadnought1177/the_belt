console.log("messages Controller");

var mongoose = require('mongoose');
var Message = mongoose.model('Message');
var Topic = mongoose.model('Topic');

function messagesController(){
    this.home = function(req,res){
        Message.find({}, false, true).populate('_comment').exec(function(err, messages) {
            res.json(messages);
        })
    };

    this.one = function(req,res){
        Message.findOne({_id: req.params.id}, false, true).populate('_comment').exec(function(err, messages) {
            res.json(messages);
        })
    };
    this.update = function(req,res){
        console.log('this is req.body:'.green, req.body);
        console.log('this is req.params:'.red, req.params);
        var count_number = req.body.count_number;
        Message.findOne({_id:req.params.id}, function(err,topic){

            var money = Object.keys(topic._doc);
            console.log("this is the money", money);
            for (var i=0; i<money.length;i++){
                if(money[i] == count_number){
                    topic[String(money[i])] += 1;
                    topic.save(function(err){
                        if(err){
                            console.log(err);
                        }else{
                            res.sendStatus(200);
                        }
                    });

                }
            }

    });
    };
    this.addmessage = function(req,res){

        var newMessage = new Message(req.body);
        newMessage._user = req.session.userId;
        newMessage._topic = req.params.id;

        console.log(newMessage);
        newMessage.save( function(err, result) {
            if(err) {
                console.log('unable to add message');
            } else {
                console.log('successfully added a message!');
                Topic.findOne({_id:req.params.id},function(err,topic){
                    if(err){
                        console.log(err)
                    }
                    else{
                        console.log('^^^^^^^^^^^^^^^');
                        console.log(topic);
                        topic._messages.push(newMessage._id);
                        topic.save(function(err){
                            if(err){
                                console.log(err);
                            }else{
                                res.sendStatus(200);
                            }
                        });
                    }
                });

            }
        })
    };
    this.index = function(req,res){
        Message.find({}).populate('_user').populate({path:'comments', model:'Comment', populate:{path:'_user', model:'User'}}).exec(function(err,messages){
            if(err){
                console.log('unable to grab messages');
                res.sendStatus(404);
            }else{
                console.log('foundem');
                res.json(messages);
            }
        })
    }
};

module.exports = new messagesController();
