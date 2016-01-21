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

                // route for the contact page
                .when('/projects', {
                    title: 'Projects',
                    templateUrl: 'pages/projects.html',
                    controller: 'projectsController'
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
    codingBarrierApp.controller('mainController', function ($rootScope, $scope, $location) {

        // create a message to display in our view
        var title = $rootScope.title;
        if (typeof title !== 'undefined' && title.indexOf("Home") > -1) {
            $rootScope.header = 'Home Page';
            $rootScope.message = 'Coding Barrier under construction.';
        }
        var fullUrl = $location.absUrl();
        if (fullUrl.indexOf("anthonybarrera.com") > -1) {
            $rootScope.siteName = "Anthony Barrera";
        } else {
            $rootScope.siteName = "Coding Barrier";
        }
    });

    codingBarrierApp.directive('jumboLoaded', function () {
        return {
            priority: Number.MIN_SAFE_INTEGER, // a low number so this directive loads after all other directives have loaded. 
            restrict: "A", // attribute only
            link: function postLink($scope, $element, $attributes) {


                $scope.$watch('message', function () {
                    var jumboHeight = $('.jumbotron').outerHeight(true);
                    $(window).off('.affix');
                    $('.affic-block').removeData('bs.affix').removeClass('affix affix-top affix-bottom');
                    $('.affic-block').affix({
                        offset: {
                            top: jumboHeight
                        }
                    });
                });
            }
        };
    });

    codingBarrierApp.controller('resumeController', function ($rootScope) {
        $rootScope.header = 'Resume';
        $rootScope.message = 'Anthony Barrera';
    });

    codingBarrierApp.controller('notFoundController', function ($rootScope) {
        $rootScope.header = 'Page not Found';
        $rootScope.message = 'Sorry, but the page you were trying to view does not exist.';
    });

    codingBarrierApp.controller('projectsController', function ($rootScope) {
        $rootScope.header = 'Projects';
        $rootScope.message = '';
    });

    codingBarrierApp.controller('projectNameController',
            function ($routeParams, $window) {
                var proj = $routeParams.name;
                $window.location.href = '/projects/' + proj;
            });
})();