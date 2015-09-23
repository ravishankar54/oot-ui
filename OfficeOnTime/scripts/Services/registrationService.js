'use strict';
ootApp.service('registrationService', function ($http, $rootScope) {
    delete $http.defaults.headers.common['X-Requested-With'];
    this.create = function (User) {
        // $http() returns a $promise that we can add handlers with .then()
        return $http({
            method: 'POST',
            data: User,
            url: $rootScope.url + 'employee/create'
        });
    }
    this.isRegistered = function (employeeId) {
        return $http({
            method: 'GET',
            url: $rootScope.url + 'employee/isregistered/',
            params: { id: employeeId }
        });
    }
    this.update = function (User) {
        // $http() returns a $promise that we can add handlers with .then()
        return $http({
            method: 'PUT',
            data: User,
            url: $rootScope.url + 'employee/update'
        });
    }
});