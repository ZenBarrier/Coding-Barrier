/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


angular.module('codingBarrierApp')
        .controller('blogController', function ($scope, $rootScope, $sce, BloggerApi) {

            $rootScope.header = 'Coding Barrier Blog';
            $rootScope.message = '';

            getBlog();

            function getBlog() {
                BloggerApi.getBlog()
                        .then(
                                function (response) {
                                    blogRetrievedSuccess(response);
                                },
                                function (response) {
                                    blogRetrievedFail(response);
                                });
            };

            var blogRetrievedSuccess = function (response) {
                $scope.blog = response.data.items;
                console.log(response.data.items);
            };

            var blogRetrievedFail = function (response) {
                $scope.blog = "error";
            };

            $scope.jumpBreak = function (post) {
                var postBreak = post.split("<a name='more'>")[0];

                window.SyntaxHighlighter.highlight();
                var jText = $('<div/>').html(postBreak);
                jText.find("iframe").wrap('<div class="embed-responsive embed-responsive-16by9"/>');
                jText.find("iframe").addClass('embed-responsive-item');
                jText.find("img").addClass('img-responsive');
                return $sce.trustAsHtml(jText.html());

            };

            $scope.extractPath = function (urlString) {
                var postUrl = new URL(urlString);
                return postUrl.pathname;
            };
        });
