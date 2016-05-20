/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


angular.module('codingBarrierApp').controller('blogPostController',
        function ($rootScope, $location, $routeParams, $window, $sce, BloggerApi, DisqusApi) {
            var blogPost = this;
            var getCount = 0;
            var path = $routeParams.year + '/' + $routeParams.month + '/' + $routeParams.postPath;

            blogPost.trustHtml = function (htmlString) {
                window.Prism.highlightAll();
                var jText = $('<div/>').html(htmlString);
                jText.find("iframe").wrap('<div class="embed-responsive embed-responsive-16by9"/>');
                jText.find("iframe").addClass('embed-responsive-item');
                jText.find("img").addClass('img-responsive');
                return $sce.trustAsHtml(jText.html());
            };
            
            getPost();

            function getPost() {
                BloggerApi.getBlogPost(path).then(
                                function (response) {
                                    blogRetrievedSuccess(response);
                                },
                                function (response) {
                                    blogRetrievedFail(response);
                                });

                var blogRetrievedSuccess = function (response) {
                    blogPost.post = response.data;
                    blogPost.disqus = 'pages/disqusModule.html';
                    $rootScope.title = response.data.title + " | Blog";
                    $rootScope.header = response.data.title;
                    $rootScope.message = 'by ' + response.data.author.displayName;
                    $rootScope.post = response.data;
                    console.log(response.data);
                    
                    DisqusApi.getComments(response.data.url);
                };

                var blogRetrievedFail = function (response) {
                    blogPost.post = "error";
                    console.log(response);

                    if (response.status === 500) {
                        if (getCount < 3) {
                            getCount++;
                            getPost();
                        } else {
                            $window.location.href = 'http://blog.codebarrier.com/' + path;
                            $location.replace();
                        }
                    }

                    if (response.status === 404) {
                        $location.path('/404');
                        $location.replace();
                    }
                };
            };
        });
