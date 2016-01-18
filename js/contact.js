
angular.module('codingBarrierApp').controller('contactController', function ($rootScope, $scope, $http) {
    $rootScope.header = 'Contact';
    $rootScope.message = 'This will be my contact page!';

    $scope.clear = function () {
        $scope.form.name = '';
        $scope.form.email = '';
        $scope.form.subject = '';
        $scope.form.message = '';
    };

    $scope.sendEmail = function () {
        $http({
            method: 'POST',
            url: '/mail/',
            data: $.param($scope.form), // pass in data as strings
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}  
        })
                .success(function () {
                    
                });
    };
});