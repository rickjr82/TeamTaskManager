teamTaskManager.controller('taskListController', ['$scope', 'dataservice', 'logger', '$location',
function ($scope, dataservice, logger, $location) {
    $scope.tasks = [];
    $scope.newTaskName = "";
    $scope.newTaskDesc = "";
    function refreshView() {
        $scope.$apply();
    }
    $scope.getTasks = function () {
        $scope.tasks = [];
        dataservice.getEntities('Tasks', $scope.tasks, refreshView);
    };
    $scope.addTask = function (newTaskName, newTaskDesc) {
        dataservice.addEntityToCollection('Task', [{ name: 'name', value: newTaskName }, { name: 'description', value: newTaskDesc }], $scope.tasks, refreshView);
    };
    
    $scope.endEdit = function (task) {
        dataservice.completeEntityEdit(task, refreshView);
    }
    $scope.deleteTask = function (task) {
        dataservice.deleteEntityFromCollection(task, $scope.tasks, refreshView)
    };
    $scope.close = function () {
        $location.path('/admin');
    };
    $scope.getTasks();
}]);