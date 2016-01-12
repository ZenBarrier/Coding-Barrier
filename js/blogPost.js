/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


angular.module('codingBarrierApp').controller('blogPostController',
        function ($rootScope, $scope, $http, $location, $routeParams, $window, $sce) {
            var getCount = 0;
            var path = $routeParams.year + '/' + $routeParams.month + '/' + $routeParams.postPath;

            $scope.trustHtml = function (htmlString) {
                SyntaxHighlighter.highlight();
                var jText = $('<div/>').html(htmlString);
                jText.find("iframe").wrap('<div class="embed-responsive embed-responsive-16by9"/>');
                jText.find("iframe").addClass('embed-responsive-item');
                return $sce.trustAsHtml(jText.html());
            };

            $scope.getPost = function () {

                $http.get("https://www.googleapis.com/blogger/v3/blogs/4379869744446220679/posts/\n\
bypath?path=/" + path + "&key=AIzaSyBe8zrqjTGEj92YfFvqEc4Yt993QW0q0cA")
                        .then(
                                function (response) {
                                    blogRetrievedSuccess(response);
                                },
                                function (response) {
                                    blogRetrievedFail(response);
                                });

                var blogRetrievedSuccess = function (response) {
                    $scope.post = response.data;
                    $scope.disqus = 'pages/disqusModule.html';
                    $rootScope.title = response.data.title + " | Blog";
                    $rootScope.header = response.data.title;
                    $rootScope.message = 'by '+response.data.author.displayName;
                    $rootScope.hasComments = true;
                    $rootScope.post = response.data;
                    console.log(response.data);

                    if (typeof DISQUS !== 'undefined') {
                        DISQUS.reset({
                            reload: true,
                            config: function () {
                                //this.page.identifier = response.data.id;
                                this.page.url = response.data.url;
                            }
                        });
                    }
                    ;
                };

                var blogRetrievedFail = function (response) {
                    $scope.post = "error";
                    $rootScope.hasComments = false;
                    console.log(response);

                    if (response.status === 500) {
                        if (getCount < 3) {
                            getCount++;
                            $scope.getPost();
                        } else {
                            $window.location.href = 'http://blog.codingbarrier.com/' + path;
                            $location.replace();
                        }
                    }

                    if (response.status === 404) {
                        $location.path('/404');
                        $location.replace();
                    }
                };
            };
            $scope.getPost();
        });
