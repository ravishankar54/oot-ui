'use strict';
ootApp.controller('FeedbackCtrl', ['$scope', '$rootScope', 'Notification', 'SpinnerDialog', 'feedbackService',
        function ($scope, $rootScope, Notification, SpinnerDialog, feedbackService) {

            $scope.Comment = "";

            $scope.getCategoriesFromService = function () {
                feedbackService.getCategories().then(function (dataResponse) {
                    SpinnerDialog.show();
                    $scope.categories = dataResponse.data;
                    $scope.setDefaultRatings();
                    SpinnerDialog.hide();
                }, function (error) {
                    SpinnerDialog.hide();
                    Notification.alert(error.data.code, function () { }, 'Info', 'OK');
                });
            };

            $scope.setDefaultRatings = function () {
                angular.forEach($scope.categories, function (u, i) {
                    $scope.getSelectedRating(1, u.ID);
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

            $scope.fillSurveyComment = function () {
                $scope.surveyComment = {};
                $scope.surveyComment["EmployeeID"] = $rootScope.userFromStorage.item(0).ID;
                $scope.surveyComment["Comment"] = $scope.Comment;
            };

            $scope.submitSurveyComment = function () {
                feedbackService.submitComment($scope.surveyComment).then(function (response) {
                    Notification.alert('Feedback submitted successfully', function () { }, 'Info', 'Success');
                }, function (error) {
                    Notification.alert(error.data.Message, function () { }, 'Error', 'INternal server error');
                });
            };

            $scope.Submit = function () {
                SpinnerDialog.show();
                feedbackService.submitSurvey(JSON.stringify($scope.surveyList)).then(function (response) {
                    $scope.fillSurveyComment();
                    if ($scope.surveyComment != null) {
                        $scope.submitSurveyComment();
                    }
                    else {
                        Notification.alert('Feedback submitted successfully', function () { }, 'Info', 'Success');
                    }
                }, function (error) {
                    Notification.alert(error.data.Message, function () { }, 'Error', 'INternal server error');
                });
                SpinnerDialog.hide();
            };
        }]);
