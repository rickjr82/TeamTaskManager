/* main: startup script creates the 'todo' module and adds custom Ng directives */

// 'todo' is the one Angular (Ng) module in this app
// 'todo' module is in global namespace
window.teamTaskManager = angular.module('teamTaskManager', ['ui.bootstrap', 'smartTable.table']);

// Add global "services" (like breeze and Q) to the Ng injector
// Learn about Angular dependency injection in this video
// http://www.youtube.com/watch?feature=player_embedded&v=1CpiB3Wk25U#t=2253s
teamTaskManager.value('breeze', window.breeze)
    .value('Q', window.Q).value('toastr', window.toastr);;

// Configure routes
teamTaskManager.config(['$routeProvider', function ($routeProvider) {
      $routeProvider.
          when('/', { templateUrl: 'app/html/views/admin.html', controller: 'adminController' }).
       when('/teams', { templateUrl: 'app/html/views/teamList.html', controller: 'teamListController' }).
      when('/players:teamId', { templateUrl: 'app/html/views/playerList.html', controller: 'playerListController' }).
   when('/games/:teamId', { templateUrl: 'app/html/views/gameList.html', controller: 'gameListController' }).
          when('/tasks:teamId', { templateUrl: 'app/html/views/taskList.html', controller: 'taskListController' }).
          when('/teamDetail/:teamId', { templateUrl: 'app/html/views/teamDetail.html', controller: 'teamDetailController' }).
    when('/taskSignUp/:teamId', { templateUrl: 'app/html/views/signUp.html', controller: 'signUpController' })
        .when('/admin', { templateUrl: 'app/html/views/admin.html', controller: 'adminController' })
          .otherwise({ redirectTo: '/' });
  }]);

//#region Ng directives
/*  We extend Angular with custom data bindings written as Ng directives */
teamTaskManager.directive('onFocus', function () {
        return {
            restrict: 'A',
            link: function (scope, elm, attrs) {
                elm.bind('focus', function () {
                    scope.$apply(attrs.onFocus);
                });
            }
        };
    })
    .directive('onBlur', function () {
        return {
            restrict: 'A',
            link: function (scope, elm, attrs) {
                elm.bind('blur', function () {
                    scope.$apply(attrs.onBlur);
                });
            }
        };
    })
    .directive('onEnter', function () {
        return function (scope, element, attrs) {
            element.bind("keydown keypress", function (event) {
                if (event.which === 13) {
                    scope.$apply(function () {
                        scope.$eval(attrs.onEnter);
                    });

                    event.preventDefault();
                }
            });
        };
    })
    .directive('selectedWhen', function () {
        return function (scope, elm, attrs) {
            scope.$watch(attrs.selectedWhen, function (shouldBeSelected) {
                if (shouldBeSelected) {
                    elm.select();
                }
            });
        };
    });
if (!Modernizr.input.placeholder) {
    // this browser does not support HTML5 placeholders
    // see http://stackoverflow.com/questions/14777841/angularjs-inputplaceholder-directive-breaking-with-ng-model
    teamTaskManager.directive('placeholder', function () {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attr, ctrl) {

                var value;

                var placeholder = function () {
                    element.val(attr.placeholder);
                };
                var unplaceholder = function () {
                    element.val('');
                };

                scope.$watch(attr.ngModel, function (val) {
                    value = val || '';
                });

                element.bind('focus', function () {
                    if (value == '') unplaceholder();
                });

                element.bind('blur', function () {
                    if (element.val() == '') placeholder();
                });

                ctrl.$formatters.unshift(function (val) {
                    if (!val) {
                        placeholder();
                        value = '';
                        return attr.placeholder;
                    }
                    return val;
                });
            }
        };
    });
}
//#endregion 