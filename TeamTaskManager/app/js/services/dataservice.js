teamTaskManager.factory('dataservice', ['logger', '$timeout', function (logger, $timeout) {

    breeze.config.initializeAdapterInstance("modelLibrary", "backingStore", true);

    var useLocalHost = true;
    var host = useLocalHost ? "http://localhost:49242" : "http://myteamtracker.azurewebsites.net/";
    var serviceName = "api/teaminfo";

    var manager = new breeze.EntityManager(serviceName);
    //    manager.enableSaveQueuing(true);

    var dataservice = {
        getTeams: getTeams,
        createTeam: createTeam,
        saveChanges: saveChanges
    };
    return dataservice;

    /*** implementation details ***/

    //#region main application operations
    function getTeams() {
        var query = breeze.EntityQuery.from("Teams");

        return manager.executeQuery(query);
    }

    function createTeam(initialValues) {
        return manager.createEntity('Team', initialValues);
    }

    function saveChanges() {
        return manager.saveChanges()
            .then(saveSucceeded)
            .fail(saveFailed);

        function saveSucceeded(saveResult) {
            logger.success("# of Teams saved = " + saveResult.entities.length);
            logger.log(saveResult);
        }

        function saveFailed(error) {
            var reason = error.message;
            var detail = error.detail;

            if (error.entityErrors) {
                reason = handleSaveValidationError(error);
            } else if (detail && detail.ExceptionType &&
                detail.ExceptionType.indexOf('OptimisticConcurrencyException') !== -1) {
                // Concurrency error 
                reason =
                    "Another user, perhaps the server, " +
                    "may have deleted one or all of the teams." +
                    " You may have to restart the app.";
            } else {
                reason = "Failed to save changes: " + reason +
                         " You may have to restart the app.";
            }

            logger.error(error, reason);
            // DEMO ONLY: discard all pending changes
            // Let them see the error for a second before rejecting changes
            $timeout(function () {
                manager.rejectChanges();
            }, 1000);
            throw error; // so caller can see it
        }
    }

    function handleSaveValidationError(error) {
        var message = "Not saved due to validation error";
        try { // fish out the first error
            var firstErr = error.entityErrors[0];
            message += ": " + firstErr.errorMessage;
        } catch (e) { /* eat it for now */ }
        return message;
    }

    //#endregion

}]);
