/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


angular.module('codingBarrierApp').controller('blogController', function ($scope, $http) {
    $scope.message = 'This will be my blog page!';

    $http.get("https://www.googleapis.com/blogger/v3/blogs/4379869744446220679/posts?key=AIzaSyBe8zrqjTGEj92YfFvqEc4Yt993QW0q0cA")
            .then(
                    function (response) {
                        blogRetrievedSuccess(response)
                    },
                    function (response) {
                        blogRetrievedFail(response)
                    });

    var blogRetrievedSuccess = function (response) {
        $scope.blog = response.data.items;
        console.log(response.data.items);
    };

    var blogRetrievedFail = function (response) {
        $scope.blog = "error";
    };

    $scope.jumpBreak = function (string, index) {
        $scope.array = string.split('<br />');
        return $scope.result = $scope.array[index];
    }
});
