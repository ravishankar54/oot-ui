'use strict';
ootApp.controller('HomeCtrl', ['$scope', '$rootScope', '$location', 'dbService',
        function ($scope, $rootScope, $location, dbService) {

            $scope.initController = function () {
                dbService.createDB();
            };


            $scope.getUserFromLocalStorage = function () {
                dbService.getUser();
            };

            $scope.getUserFromLocalStorage();

            $rootScope.$on('getResultSet', function (event, args) {
                if (args.resultSet.length > 0) {
                    $rootScope.userLocallyAvailable = true;
                    $rootScope.userFromStorage = args.resultSet;
                    $scope.NavigationText = 'Feedback';
                    $scope.NavigationLink = '/Survey';
                }
                else {
                    $scope.NavigationText = 'Register';
                    $scope.NavigationLink = '/Register';
                }
            });

            $scope.go = function (url) {
                $location.url(url);
            };
        }
]);