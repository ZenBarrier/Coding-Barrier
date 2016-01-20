
angular.module('codingBarrierApp').controller('contactController', function ($rootScope, $scope, $http) {
    $rootScope.header = 'Contact';
    $rootScope.message = 'This will be my contact page!';

    $scope.clear = function (form) {
        if (form) {
            form.$setPristine();
            form.$setUntouched();
        }
        $scope.user = {};
    };

    $scope.sendEmail = function () {
        if ($rootScope.siteName.indexOf("Coding") > 0) {
            $scope.user.to="Anthony B <anthony@codingbarrier.com>";
        } else {
            $scope.user.to="Anthony B <mail@anthonybarrera.com>";
        }
        console.log($.param($scope.user));
        $http({
            method: 'POST',
            url: '/mail/',
            data: $.param($scope.user), // pass in data as strings
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
                .success(function () {

                });
    };

    $scope.clear();
});