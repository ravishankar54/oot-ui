'use strict';
ootApp.service('categoryService', function ($http, $rootScope) {
    delete $http.defaults.headers.common['X-Requested-With'];
    this.getCategories = function () {
        // $http() returns a $promise that we can add handlers with .then()
        return $http({
            method: 'GET',
            url: $rootScope.url + '/categories/getall'
        });
    }
    this.submitSurvey = function (surveyList) {
        return $http({
            method: 'POST',
            data: surveyList,
            url: $rootScope.url + 'employeesurvey/create'            
        });
    }
});
