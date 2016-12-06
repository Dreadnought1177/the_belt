myApp.controller('userProfileController', ['userFactory', '$location', '$routeParams', userProfileController]);

function userProfileController(userFactory, $location, $routeParams){
    // I need my user Profile Controller to bring back my user and display
    // the number of topics, posts and comments he has made
    var _this = this;

    function get_user_profile(){
        userFactory.get_user_profile($routeParams.id,function(data){
            console.log("this is the get user data", data);
            _this.user_profile =data;
        })

    }
    get_user_profile()
};