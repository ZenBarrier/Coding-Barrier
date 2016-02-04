(function () {
    var codingBarrierApp = angular.module('codingBarrierApp', ['ngRoute', 'ngSanitize', 'ngAnimate', 'CodingBarrierService']);

// configure our routes
    codingBarrierApp.config(function ($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(true);

        $routeProvider

                // route for the home page
                .when('/', {
                    title: 'Home',
                    templateUrl: 'pages/home.html',
                    controller: 'homeController',
                    controllerAs: 'home'
                })

                // route for the about page
                .when('/resume', {
                    title: 'Resume',
                    templateUrl: 'pages/resume.html',
                    controller: 'resumeController',
                    controllerAs: 'resume'
                })

                // route for the contact page
                .when('/contact', {
                    title: 'Contact',
                    templateUrl: 'pages/contact.html',
                    controller: 'contactController',
                    controllerAs: 'contact'
                })

                // route for the contact page
                .when('/projects', {
                    title: 'Projects',
                    templateUrl: 'pages/projects.html',
                    controller: 'projectsController',
                    controllerAs: 'project'
                })

                // route for the contact page
                .when('/projects/:name', {
                    title: 'Projects',
                    templateUrl: 'pages/projects.html',
                    controller: 'projectNameController'
                })

                .when('/blog', {
                    title: 'Blog',
                    templateUrl: 'pages/blog.html',
                    controller: 'blogController',
                    controllerAs: 'blogPage'
                })

                .when('/blog/:year/:month/:postPath', {
                    title: 'Post | Blog',
                    templateUrl: 'pages/blogPost.html',
                    controller: 'blogPostController',
                    controllerAs: 'blogPost'
                })

                .otherwise({
                    title: '404',
                    templateUrl: 'pages/404.html',
                    controller: 'notFoundController',
                    controllerAs: 'notFound'
                });

    });

    codingBarrierApp.run(['$rootScope', function ($rootScope) {
            $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
                $rootScope.title = current.title;
            });
        }]);

// create the controller and inject Angular's $scope
    codingBarrierApp.controller('mainController', function ($rootScope, $scope, $location) {
        var fullUrl = $location.absUrl();
        if (fullUrl.indexOf("anthonybarrera.com") > -1) {
            $rootScope.siteName = "Anthony Barrera";
        } else {
            $rootScope.siteName = "Coding Barrier";
        }
    });

    codingBarrierApp.controller('homeController', function ($rootScope) {
        $rootScope.header = 'Home';
        $rootScope.message = 'Anthony Barrera';
        var home = this;
    });

    codingBarrierApp.controller('resumeController', function ($rootScope) {
        $rootScope.header = 'Resume';
        $rootScope.message = 'Anthony Barrera';
        var resume = this;
    });

    codingBarrierApp.controller('notFoundController', function ($rootScope) {
        $rootScope.header = 'Page not Found';
        $rootScope.message = 'Sorry, but the page you were trying to view does not exist.';
        var notFound = this;
    });

    codingBarrierApp.controller('projectsController', function ($rootScope) {
        $rootScope.header = 'Projects';
        $rootScope.message = '';
        var project = this;
    });

    codingBarrierApp.controller('projectNameController',
            function ($routeParams, $window) {
                var proj = $routeParams.name;
                $window.location.href = '/projects/' + proj;
            });

    $('.affic-block').affix({
        offset: {
            top: function () {
                return $('.jumbotron').outerHeight(true);
            }
        }
    });
})();