teamTaskManager.controller('teamDetailController', ['$scope', '$routeParams', 'dataservice', 'logger',
            function ($scope, $routeParams, dataservice, logger) {
                $scope.close = function () {
                    $location.path('/admin');
                };

            }]);
