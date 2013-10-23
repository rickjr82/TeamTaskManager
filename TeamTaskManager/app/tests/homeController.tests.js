'use strict';
 
describe('homeController', function () {
    var scope;//we'll use this scope in our tests
 
    //mock Application to allow us to inject our own dependencies
    beforeEach(angular.mock.module('teamTaskManager'));
    //mock the controller for the same reason and include $rootScope and $controller
    beforeEach(angular.mock.inject(function($rootScope, $controller){
        //create an empty scope
        scope = $rootScope.$new();
        //declare the controller and inject our empty scope
        $controller('homeController', { $scope: scope });
    }));
    // tests start here
    it('should have no teams', function(){
        expect(scope.teams.length).toBe(0);
        });
});