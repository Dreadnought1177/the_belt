myApp.controller('topicController', ['userFactory', '$location', topicController]);


function topicController(userFactory, $location){
    var _this = this;

    function getTopics(){
        userFactory.getTopics(function(data){
            // data[0].createdAt =
            _this.topics=data;

            console.log("Topics: ", _this.topics);
            getCurrentUser();
        })
    }

    function getCurrentUser(){
        userFactory.getCurrentUser(function(data){
            _this.user=data;
            console.log(data);
        })
    }
    getTopics();

    this.addTopic = function(newTopic) {
        userFactory.addTopic(newTopic, getTopics);
        $location.path('/home');
    };
    this.deleteTopic = function(deleteThis){
        userFactory.deleteTopic(deleteThis, getTopics)

    };
    //
    // function getMessages_topic(function(data){
    //     userFactory.go_to_topic()
    // }){
    //
    //
    // }
    // this.go_to_topic = function(topic, callback){
    //      _this.the_messages = returned.data
    // }
};
