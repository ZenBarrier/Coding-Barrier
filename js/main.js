var codingBarrierApp = angular.module('codingBarrierApp', ['ngRoute']);

// configure our routes
codingBarrierApp.config(function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    
    $routeProvider

            // route for the home page
            .when('/', {
                templateUrl: 'pages/home.html',
                controller: 'mainController'
            })

            // route for the about page
            .when('/about', {
                templateUrl: 'pages/about.html',
                controller: 'aboutController'
            })

            // route for the contact page
            .when('/contact', {
                templateUrl: 'pages/contact.html',
                controller: 'contactController'
            })

            .otherwise({
                templateUrl: 'pages/404.html',
                controller: 'notFoundController'
            });

});

// create the controller and inject Angular's $scope
codingBarrierApp.controller('mainController', function ($scope) {

    // create a message to display in our view
    $scope.message = 'Coding Barrier under construction.';
});

codingBarrierApp.controller('aboutController', function ($scope) {
    $scope.message = 'This will be about me.';
});

codingBarrierApp.controller('contactController', function ($scope) {
    $scope.message = 'This will be my contact page!';
});

codingBarrierApp.controller('notFoundController', function ($scope) {
    $scope.message = 'Sorry, but the page you were trying to view does not exist.';
});