/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


angular.module('codingBarrierApp').controller('blogPostController', function ($scope, $http, $routeParams) {
    $scope.message = 'This will be my blog page!';
    var path = $routeParams.postPath;

    $http.get("https://www.googleapis.com/blogger/v3/blogs/4379869744446220679/posts/\n\
bypath?path=" + path + "key=AIzaSyBe8zrqjTGEj92YfFvqEc4Yt993QW0q0cA")
            .then(
                    function (response) {
                        blogRetrievedSuccess(response);
                    },
                    function (response) {
                        blogRetrievedFail(response);
                    });

    var blogRetrievedSuccess = function (response) {
        $scope.post = response;
        console.log(response);
    };

    var blogRetrievedFail = function (response) {
        $scope.blog = "error";
    };
});
