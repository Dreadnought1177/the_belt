myApp.factory('userFactory', ['$http', function($http){
    var factory = {};
    factory.user = {};
    factory.topic = {};
    factory.getusers = function(callback){
        $http.get('/').then(function(returned_data){

            callback(returned_data.data)
        })
    };

    factory.adduser = function(user, callback){

        $http.post('/create', user).then(function(returned_data){
            factory.user = returned_data.data;
            callback(returned_data.data);
        })
    };

    factory.loginuser = function(user, callback){
        $http.post('/login', user).then(function(returned_data){
            factory.user = returned_data.data;
            // console.log(user);
            callback(returned_data.data);
        })
    };

    factory.home = function(callback){
        $http.get('/home').then(function(data){
            callback(data.data);
        })
    };

    factory.addmessage = function(message, id, callback){
        $http.post('/addmessage/'+ id, message).then(function(){
            callback();
        })
    };


    factory.getMessages = function(callback){
        $http.get('/messages').then(function(returned_data){
            callback(returned_data.data);
        })
    };

    factory.addComment = function(newComment, callback){
        $http.post('/addComment', newComment).then(function(returned_data){
            callback(returned_data.data);
        })
    };

    factory.getTopics = function(callback){
        $http.get('/topics').then(function(returned_data){
            callback(returned_data.data);
        })
    };

    factory.addTopic = function(topic, callback){
        $http.post('/addtopic', topic).then(function(returned_data){
            callback();
            console.log(returned_data);
        })
    };

    factory.getCurrentUser = function(callback){
        callback(factory.user);
    };
    factory.go_to_topic = function(id,callback){
        $http.get('/topic_page/'+id).then(function(returned_data){

            callback(returned_data.data);
        })
    };

    factory.get_user_profile = function(id,callback){
        console.log("this is the id of the user whos info i want",id);
        console.log("this is the callback", callback);
        $http.get('/user_profile_page/'+id).then(function(returned_data){
            console.log("this is the returned data... should be the user i want", returned_data);
            console.log("this is the returned data... should be the user i want + data", returned_data.data);
            callback(returned_data.data);
        })
    };

    factory.update_count = function(update_count, id, callback){
        console.log("this is the id", id);
        console.log("this is the update_count", update_count);
        update_count = {count_number:update_count};
        $http.post('/up_date/' + id, update_count).then(function(returned_data){
            console.log(returned_data.data);
            callback(returned_data.data);
            })
    };
    factory.deleteTopic = function(id, callback){
        $http.delete('/delete_me/'+id).then(function(){
            callback()
        })
    };

    return factory;
}]);
