console.log('users controller');

var mongoose = require('mongoose');
var User = mongoose.model('User');

function usersController(){
    this.index = function(req,res){
        User.find({}, function(err, users) {
            req.session.userId = "";
            res.json(users);
        })
    };
    this.getUser =function(req,res){
        User.find({_id: req.params.id}).exec(function(err,user){
            if(err){
                console.log("unable to grab user");
                res.sendStatus(404);
            }else{
                console.log('foundem');
                console.log(user);
                res.json(user);
            }
        })
    }
    this.create = function(req,res){
        User.create(req.body, function(err, result) {
            if(err) {
                console.log('There were validation errors', err);
                res.json(err);
            } else {
                console.log('successfully added an user!');
                req.session.userId = result._id
                res.json(result);
            }
        })
    };
    this.login = function(req,res){
        var errors = {errors:{
            general: 'Invalid login information'}};
        User.findOne({email:req.body.email}).exec(function(err, user){
            if (!req.body.password||!req.body.email||!user){
                console.log(errors);
                res.json(errors)
            } else {
                if (user.password != req.body.password) {
                    console.log(errors);
                    res.json(errors)
                } else {
                    req.session.userId = user._id;
                    res.json(user);
                }
            }
        })
    };

    this.home = function(req,res){
        User.findOne({_id: req.session.userId}).exec(function(err, user){
            if (err){
                console.log('HI THERE');
                res.status(500).send("Failure");
            } else{
                res.json(user);
            }
        })
    };

};


module.exports= new usersController();