teamTaskManager.controller('homeController', ['$scope','$rootScope', '$location', 'logger', 'teamDetail',
    function ($scope,$rootScope, $location, logger, teamDetail) {        
         $scope.selectCoach = function () {
            $location.path('/coachHome');
        };
        $scope.selectParent = function () {
            $location.path('/parentHome');
        };
        if (typeof($rootScope.currentUserId)=='undefined') {
            teamDetail.getCurrentUserId().then(function (result) {
                $rootScope.currentUserId = result;
            });
        }
        
    }]);