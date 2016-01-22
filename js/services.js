var CodingBarrierService = angular.module('CodingBarrierService', []);

CodingBarrierService.factory('BloggerApi', ['$http', function ($http) {

        var urlBase = 'https://www.googleapis.com/blogger/v3/blogs/';
        var blogId = '4379869744446220679';
        var apiKey = 'key=AIzaSyBe8zrqjTGEj92YfFvqEc4Yt993QW0q0cA';
        var BloggerApi = {};

        BloggerApi.getBlog = function () {
            return $http.get(urlBase + blogId + '/posts?' + apiKey);
        };

        BloggerApi.getBlogPost = function (path) {
            return $http.get(urlBase + blogId + '/posts/bypath?path=/' + path + '&' + apiKey);
        };

        return BloggerApi;

    }]);

CodingBarrierService.factory('DisqusApi', ['$http', function () {

        var urlBase = "//codingbarrier.disqus.com/embed.js";
        var DisqusApi = {};

        DisqusApi.getComments = function (postUrl) {
            if (typeof window.DISQUS !== 'undefined') {
                window.DISQUS.reset({
                    reload: true,
                    config: function () {
                        //this.page.identifier = response.data.id;
                        this.page.url = postUrl;
                    }
                });
            } else {
                window.disqus_config = function () {
                    this.page.url = postUrl;
                };
                $.ajax({
                    type: "GET",
                    url: urlBase,
                    dataType: "script",
                    cache: true
                });
            };
        };

        return DisqusApi;

    }]);

CodingBarrierService.factory('MailBoxApi', ['$http', function ($http) {

        var urlBase = 'http://apilayer.net/api/check';
        var apiKey = '?access_key=c6631fa3c4bdbede10afedd778b5dfd2';
        var smpt = '&smtp=1';
        var format = '&format=1';
        var MailBoxApi = {};

        MailBoxApi.getBlog = function (email) {
            return $http.get(urlBase + apiKey + email + apiKey + smpt +format);
        };

        return MailBoxApi;

    }]);