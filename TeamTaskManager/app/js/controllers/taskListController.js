teamTaskManager.controller('taskListController', ['$scope', 'dataservice', 'logger', '$location', '$routeParams',
function ($scope, dataservice, logger, $location, $routeParams) {
    $scope.tasks = [];
    $scope.newTaskName = "";
    $scope.newTaskDesc = "";
    $scope.teamId = $routeParams.teamId;
    function refreshView() {
        $scope.$apply();
    }
    $scope.getTasks = function () {
        $scope.tasks = [];
        dataservice.getEntities('Tasks', $scope.tasks, refreshView, [{ typeQ: 'where', first: 'teamId', second: 'eq', third: $scope.teamId }]);
    };
    $scope.addTask = function (newTaskName, newTaskDesc) {
        dataservice.addEntityToCollection('Task', [{ name: 'name', value: newTaskName }, { name: 'description', value: newTaskDesc }, {name:'teamId', value:$scope.teamId}], $scope.tasks, refreshView);
    };
    
    $scope.endEdit = function (task) {
        dataservice.completeEntityEdit(task, refreshView);
    }
    $scope.deleteTask = function (task) {
        dataservice.deleteEntityFromCollection(task, $scope.tasks, refreshView)
    };
    $scope.close = function () {
        $location.path('/home');
    };
    $scope.getTasks();
}]);