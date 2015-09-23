'use strict';
ootApp.factory('Notification', function ($rootScope, $timeout) {
    return {
        alert: function (message, completeCallback, title, buttonLabel) {
            if (navigator.notification !== undefined) {
                navigator.notification.alert(message,
					function () {
					    $timeout(function () {
					        $rootScope.$apply(completeCallback());
					    })
					}, title, buttonLabel);
            } else {
                alert(message);
                completeCallback();
            }
        }
    };
});