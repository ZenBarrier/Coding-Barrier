var codingBarrierApp = angular.module('codingBarrierApp', ['ngRoute', 'ngSanitize']);

// configure our routes
codingBarrierApp.config(function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $routeProvider

            // route for the home page
            .when('/', {
                title: 'Home',
                hasJumbo: false,
                templateUrl: 'pages/home.html',
                controller: 'mainController'
            })

            // route for the about page
            .when('/resume', {
                title: 'Resume',
                hasJumbo: true,
                templateUrl: 'pages/resume.html',
                controller: 'resumeController'
            })

            // route for the contact page
            .when('/contact', {
                title: 'Contact',
                hasJumbo: true,
                templateUrl: 'pages/contact.html',
                controller: 'contactController'
            })

            .when('/blog', {
                title: 'Blog',
                hasJumbo: true,
                templateUrl: 'pages/blog.html',
                controller: 'blogController'
            })

            .when('/blog/:year/:month/:postPath', {
                title: 'Post | Blog',
                hasJumbo: true,
                hasComments: true,
                templateUrl: 'pages/blogPost.html',
                controller: 'blogPostController'
            })

            .otherwise({
                title: '404',
                hasJumbo: true,
                templateUrl: 'pages/404.html',
                controller: 'notFoundController'
            });

});

codingBarrierApp.run(['$rootScope', function ($rootScope) {
        $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
            $rootScope.title = current.title;
            $rootScope.hasComments = current.hasComments;
            $rootScope.hasJumbo = current.hasJumbo;
        });
    }]);

// create the controller and inject Angular's $scope
codingBarrierApp.controller('mainController', function ($scope) {

    // create a message to display in our view
    //$scope.header = 'Home Page';
    //$scope.message = 'Coding Barrier under construction.';
});

codingBarrierApp.controller('resumeController', function ($rootScope) {
    $rootScope.header = 'Resume';
    $rootScope.message = 'This will be about my resume.';
});

codingBarrierApp.controller('contactController', function ($rootScope) {
    $rootScope.header = 'Contact';
    $rootScope.message = 'This will be my contact page!';
});

codingBarrierApp.controller('notFoundController', function ($rootScope) {
    $rootScope.header = 'Page not Found';
    $rootScope.message = 'Sorry, but the page you were trying to view does not exist.';
});