'use strict';
ootApp.controller('FeedbackCtrl', ['$scope', '$rootScope', 'Notification', 'SpinnerDialog', 'feedbackService',
        function ($scope, $rootScope, Notification, SpinnerDialog, feedbackService) {

            $scope.Comment = "";

            $scope.getCategoriesFromService = function () {
                feedbackService.getCategories().then(function (dataResponse) {
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
               
                feedbackService.submitSurvey(JSON.stringify($scope.surveyList)).then(function (response) {
                    Notification.alert('Feedback submitted successfully', function () { }, 'Info', 'OK');
                }, function (error) {
                    Notification.alert(error.data.Message, function () { }, 'Info', 'OK');
                })
                $scope.surveyComment = {};
                $scope.surveyComment["EmployeeID"] = $rootScope.userFromStorage.item(0).ID;
                $scope.surveyComment["Comment"] = $scope.Comment;
                feedbackService.submitComment($scope.surveyComment).then(function (response) {
                    Notification.alert('Feedback submitted successfully', function () { }, 'Info', 'OK');
                }, function (error) {
                    Notification.alert(error.data.Message, function () { }, 'Info', 'OK');
                })
                SpinnerDialog.hide();
            };
        }]);
