
angular.module('codingBarrierApp').controller('contactController', function ($rootScope, $http) {
    $rootScope.header = 'Contact';
    $rootScope.message = 'This will be my contact page!';
    var contact = this;

    contact.clear = function (form) {
        if (form) {
            form.$setPristine();
            form.$setUntouched();
        }
        contact.user = {};
    };

    contact.sendEmail = function () {
        if ($rootScope.siteName.indexOf("Coding") > 0) {
            contact.user.to="Anthony B <anthony@codingbarrier.com>";
        } else {
            contact.user.to="Anthony B <mail@anthonybarrera.com>";
        }
        console.log($.param(contact.user));
        $http({
            method: 'POST',
            url: '/mail/',
            data: $.param(contact.user), // pass in data as strings
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
                .success(function () {

                });
    };

    contact.clear();
});