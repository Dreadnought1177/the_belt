var path = require('path');
var users = require('../controllers/users.js');
var messages = require('../controllers/messages.js');
var comments = require('../controllers/comments.js');
var topics = require('../controllers/topics.js');



function loginAuthentication(req,res,next){
    if (req.session.userId){
        next();
    }else{
        res.status(401).send("User not found");
    }
}

module.exports = function(app){
    app.get('/', users.index);
    app.post('/create', users.create);
    app.post('/login', users.login);
    app.use(loginAuthentication);
    app.get('/home', users.home);
    app.post('/addmessage/:id', messages.addmessage);
    app.get('/messages', messages.index);
    app.post('/addComment', comments.create);
    app.get('/topics', topics.home);
    app.post('/addtopic', topics.addtopic);
    app.get('/topic_page/:id', topics.getTopic);
    app.get('/user_profile_page/:id', users.getUser);
    app.post('/up_date/:id', messages.update);
    app.delete('/delete_me/:id', topics.delete);
    app.get('/answer_page/:id', topics.getTopic);



};
