'use strict';
ootApp.factory('SpinnerDialog', function () {
    return {
        show: function (title, message, cancelCallback) {
            window.plugins.spinnerDialog.show(title, message, cancelCallback);
        },
        hide: function (success, fail) {
            window.plugins.spinnerDialog.hide(success, fail);
        }
    };
});