console.log("Topics Controller");

var mongoose = require('mongoose');
var Comment = mongoose.model('Comment');
var Message = mongoose.model('Message');
var Topic = mongoose.model('Topic');

function topicsController(){
    this.home = function(req,res){
        Topic.find({}).populate('_user').exec(function(err, topics) {
            res.json(topics);
        })
    };
    this.delete = function(req,res){
        Topic.remove({_id: req.params.id}, function(err) {
            if (err) {
                return res.json(err);
            } else {
                return res.json(true);
            }
        } )
    };
    this.addtopic = function(req,res){
        var newTopic = new Topic(req.body);
        newTopic._user = req.session.userId;
        newTopic.save( function(err, result) {
            if(err) {
                console.log('unable to add topic'.red);
                res.json(err)
            } else {
                console.log('successfully added a Topic!');
                res.sendStatus(200);
            }
        })
    };
    this.index = function(req,res){
        Topic.find({}).populate('_user').populate({path:'comments', model:'Comment', populate:{path:'_user', model:'User'}}).exec(function(err,messages){
            if(err){
                console.log('unable to grab topics');
                res.sendStatus(404);
            }else{
                console.log('foundem');
                res.json(messages);
            }
        })
    };
    this.getTopic= function(req,res){
        Topic.find({_id: req.params.id}).populate(
            { path:'_messages', model:'Message', populate: [
                { path: '_user', model: 'User' },
                { path:'comments', model: 'Comment', populate: { path: '_user', model: 'User' } }
            ] } ).populate('_user').exec(function(err,topics){
            console.log("Look for array of messages here");
            console.log(topics);
            if(err){
                console.log('unable to grab topics');
                res.sendStatus(404);
            }else{
                console.log('foundem');
                console.log(topics);
                res.json(topics);
            }
        })
    }
};

module.exports = new topicsController();
