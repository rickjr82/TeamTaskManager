teamTaskManager.controller('userTaskAssignmentsController', ['$scope', 'teamDetail',
    function($scope, teamDetail) {
        $scope.taskAssignments = [];
       
        $scope.includeCompleted = false;        
        teamDetail.getCurrentUserAssignments().then(function (results) {
            $scope.taskAssignments = results;
        });
        $scope.notAlreadyCompleted = function (task) {
            if ($scope.includeCompleted) {
                return true;
            }
            var date = new Date(task.gameTime);
            return Date.now() < date;
        };
        $scope.someAreCompletedAlready = function () {
            return !_.every($scope.taskAssignments, function (taskAssignment) {
                return $scope.notAlreadyCompleted(taskAssignment);
            });
        };
    }]);