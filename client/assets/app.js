

var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(function ($httpProvider, $routeProvider) {
    $httpProvider.interceptors.push(
        function($q, $location) {
            return {
                'responseError':function(rejection){
                    if (rejection.status == 401){
                        $location.url('/');
                    }
                    return $q.reject(rejection);
                }
            };
        });
    $routeProvider
        .when('/home',{
            templateUrl: 'assets/partials/home.html',
            controller: 'topicController',
            controllerAs: "meep"
        })
        .when('/',{
            templateUrl: 'assets/partials/login.html',
            controller: 'userController'
        })
        .when('/addmessage',{
            templateUrl: 'assets/partials/home.html',
            controller: 'messageController',
            controllerAs: "meep"
        })
        .when('/topic_page/:id',{
            templateUrl: 'assets/partials/topic.html',
            controller: 'messageController',
            controllerAs: "meep"
        })
        .when('/user_page/:id',{
            templateUrl: 'assets/partials/userProfile.html',
            controller: 'messageController',
            controllerAs: "meep"
        })
        .when('/answer_page/:id',{
            templateUrl: 'assets/partials/answer_page.html',
            controller: 'messageController',
            controllerAs: "meep"
        })

        .otherwise({
            redirectTo: '/'
        });
});
