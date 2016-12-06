
myApp.controller('messageController', ['userFactory', '$location', '$routeParams', userController]);

function userController(userFactory, $location, $routeParams) {

    var _this = this;


    function getCurrentUser() {
        userFactory.getCurrentUser(function(data) {
            _this.user = data;
            userFactory.go_to_topic($routeParams.id, function (data) {
                console.log("this is data back from factory", data);
                _this.topic = data;

            })


        })
    }

    getCurrentUser();

    this.update_count = function(up_count, id) {
        console.log("this is the message controller up_count", up_count);
        console.log("this is the route params",$routeParams);
        console.log("this is the route params id",$routeParams._id);
        userFactory.update_count(up_count,id, getCurrentUser)

    };


    this.loginuser = function(){
        userFactory.loginuser(this.user, function(data){
            if(data.hasOwnProperty('errors')){
                _this.loginErrors = data.errors;
                console.log(data.errors);
            } else {
                $location.url('/topic');
            }
        })
    };


    this.addmessage = function(newMessage){
        console.log(newMessage);
        userFactory.addmessage(newMessage, $routeParams.id, function() {
            $location.path('/home')
        })
    };
    this.addComment = function(newComment, messageID){
        console.log("new comment below ======");
        newComment._message = messageID;
        console.log(newComment);


        userFactory.addComment(newComment, function(data){
            if(data.hasOwnProperty('errors')){
                _this.commentErrors = data.errors;
                console.log(data.errors);
            } else {
                console.log('invoked callback');
                // getMessages();
                getCurrentUser();
                // $location.url('/');


            }
        })
    }
}
