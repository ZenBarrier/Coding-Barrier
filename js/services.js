var CodingBarrierService = angular.module('CodingBarrierService', []);

CodingBarrierService.factory('BloggerApi' , ['$http', function ($http) {

    var urlBase = 'https://www.googleapis.com/blogger/v3/blogs/4379869744446220679/posts';
    var apiKey = 'key=AIzaSyBe8zrqjTGEj92YfFvqEc4Yt993QW0q0cA';
    var BloggerApi = {};

    BloggerApi.getBlog = function () {
        return $http.get(urlBase+'?'+apiKey);
    };

    return BloggerApi;

}]);