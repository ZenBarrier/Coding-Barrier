/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


angular.module('codingBarrierApp')
        .controller('blogController', function ($rootScope, $sce, BloggerApi) {

            $rootScope.header = 'Code Barrier Blog';
            $rootScope.message = '';
            var blogPage = this;

            getBlog();

            function getBlog() {
                BloggerApi.getBlog()
                        .then(blogRetrievedSuccess, blogRetrievedFail);
            }


            function blogRetrievedSuccess(response) {
                blogPage.blog = response.data.items;
                console.log(response.data.items);
            }

            function blogRetrievedFail(response) {
                
            }


            blogPage.jumpBreak = function (post) {
                var postBreak = post.split("<a name='more'>")[0];

                window.SyntaxHighlighter.highlight();
                var jText = $('<div/>').html(postBreak);
                jText.find("iframe").wrap('<div class="embed-responsive embed-responsive-16by9"/>');
                jText.find("iframe").addClass('embed-responsive-item');
                jText.find("img").addClass('img-responsive');
                return $sce.trustAsHtml(jText.html());

            };

            blogPage.extractPath = function (urlString) {
                var postUrl = new URL(urlString);
                return postUrl.pathname;
            };
        });
