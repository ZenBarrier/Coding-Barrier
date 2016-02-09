
angular.module('codingBarrierApp').controller('contactController', function ($rootScope, MailBoxApi, MailServerApi) {
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

    contact.checkEmail = function () {
        if ($rootScope.siteName.indexOf("Coding") > 0) {
            contact.user.to = "Anthony B <anthony@codingbarrier.com>";
        } else {
            contact.user.to = "Anthony B <mail@anthonybarrera.com>";
        }
        contact.loading = true;
        showModal();
        MailBoxApi.validateEmail(contact.user.email).then(
                function (response) {
                    console.log(response);
                    contact.loading = false;
                    contact.invalid = false;
                    contact.trust = false;
                    contact.meant = response.data.did_you_mean;
                    if (!response.data.format_valid) {
                        contact.invalid = true;
                        contact.modalHeader = "Invalid Format";
                        contact.modalBody = "The format for this email is bad.";
                    } else if (!response.data.mx_found || !response.data.smtp_check) {
                        contact.invalid = true;
                        contact.modalHeader = "Bad Email";
                        contact.modalBody = 'We checked, this email does not exist.';
                    } else if (response.data.score < 0.6) {
                        contact.trust = true;
                        contact.modalHeader = "Is this Correct?";
                        contact.modalBody = 'You have an unusual email address.';
                    } else {
                        contact.modalHeader = 'Thank You';
                        contact.modalBody = 'We have sent your message.';
                        sendEmail();
                    }
                });
    };

    contact.fixEmail = function () {
        contact.user.email = contact.meant;
        contact.checkEmail();
    };

    contact.evaluateEmail = function () {
        contact.meant = '';
        if (contact.trust) {
            contact.modalHeader = 'Thank You';
            contact.modalBody = 'We have sent your message.';
            sendEmail();
        } else {
            contact.meant = '';
        }
    };

    var sendEmail = function () {
        MailServerApi.sendMail(contact.user).then(
                function (response) {
                    console.log(response);
                });
    };

    var showModal = function () {
        $('#myModal').modal({
            keyboard: false
        });
    };

    contact.clear();
});