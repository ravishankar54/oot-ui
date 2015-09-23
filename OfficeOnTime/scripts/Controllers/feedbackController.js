'use strict';
ootApp.controller('FeedbackCtrl', ['$scope', '$rootScope', 'categoryService', 'Notification', 'SpinnerDialog',
        function ($scope, $rootScope, categoryService, Notification, SpinnerDialog) {

            $scope.getCategoriesFromService = function () {
                categoryService.getCategories().then(function (dataResponse) {
                    SpinnerDialog.show();
                    $scope.categories = dataResponse.data;
                    SpinnerDialog.hide();
                }, function (error) {
                    SpinnerDialog.hide();
                    Notification.alert(error.data.code, function () { }, 'Info', 'OK');
                });
            };

            $scope.getCategoriesFromService();

            $scope.rating = 0;
            $scope.current = 1;
            $scope.max = 5;
            $scope.surveyList = [];

            $scope.fillSurvey = function (EmployeeID, CategoryID, Rating) {
                $scope.surveyObj = {};
                $scope.surveyObj["EmployeeID"] = EmployeeID;
                $scope.surveyObj["CategoryID"] = CategoryID;
                $scope.surveyObj["Rating"] = Rating;
            };

            $scope.getSelectedRating = function (rating, category) {
                var addToList = true;
                angular.forEach($scope.surveyList, function (u, i) {
                    if (u.CategoryID === category) {
                        u.Rating = rating;
                        addToList = false;
                    }
                });
                if (addToList) {
                    $scope.fillSurvey($rootScope.userFromStorage.item(0).ID, category, rating);
                    $scope.surveyList.push($scope.surveyObj);
                }
            };

            $scope.Submit = function () {
                SpinnerDialog.show();
                categoryService.submitSurvey(JSON.stringify($scope.surveyList)).then(function (response) {
                    SpinnerDialog.hide();
                    Notification.alert('Feedback submitted successfully', function () { }, 'Info', 'OK');
                }, function (error) {
                    SpinnerDialog.hide();
                    Notification.alert(error.data.Message, function () { }, 'Info', 'OK');
                })
            };
        }]);
