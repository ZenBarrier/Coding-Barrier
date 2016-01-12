var codingBarrierApp = angular.module('codingBarrierApp', ['ngRoute', 'ngSanitize']);

// configure our routes
codingBarrierApp.config(function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $routeProvider

            // route for the home page
            .when('/', {
                title: 'Home',
                templateUrl: 'pages/home.html',
                controller: 'mainController'
            })

            // route for the about page
            .when('/resume', {
                title: 'Resume',
                templateUrl: 'pages/resume.html',
                controller: 'resumeController'
            })

            // route for the contact page
            .when('/contact', {
                title: 'Contact',
                templateUrl: 'pages/contact.html',
                controller: 'contactController'
            })

            .when('/blog', {
                title: 'Blog',
                templateUrl: 'pages/blog.html',
                controller: 'blogController'
            })

            .when('/blog/:year/:month/:postPath', {
                title: 'Post | Blog',
                templateUrl: 'pages/blogPost.html',
                controller: 'blogPostController'
            })

            .otherwise({
                title: '404',
                templateUrl: 'pages/404.html',
                controller: 'notFoundController'
            });

});

codingBarrierApp.run(['$rootScope', function ($rootScope) {
        $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
            $rootScope.title = current.title;
        });
    }]);

// create the controller and inject Angular's $scope
codingBarrierApp.controller('mainController', function ($rootScope, $location) {

    // create a message to display in our view
    $rootScope.header = 'Home Page';
    $rootScope.message = 'Coding Barrier under construction.';
    var fullUrl = $location.absUrl();
    if(fullUrl.indexOf("anthonybarrera.com") > -1){
        $rootScope.siteName = "Anthony Barrera";
    }else{
        $rootScope.siteName = "Coding Barrier";
    }
});

codingBarrierApp.controller('resumeController', function ($rootScope) {
    $rootScope.header = 'Resume';
    $rootScope.message = 'Anthony Barrera';
});

codingBarrierApp.controller('contactController', function ($rootScope) {
    $rootScope.header = 'Contact';
    $rootScope.message = 'This will be my contact page!';
});

codingBarrierApp.controller('notFoundController', function ($rootScope) {
    $rootScope.header = 'Page not Found';
    $rootScope.message = 'Sorry, but the page you were trying to view does not exist.';
});