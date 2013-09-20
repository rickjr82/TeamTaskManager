teamTaskManager.factory('dataservice', ['logger', '$timeout', function (logger, $timeout) {

    breeze.config.initializeAdapterInstance("modelLibrary", "backingStore", true);

    logger.log("creating datacontext");
    var initialized;

    configureBreeze();
    var manager = new breeze.EntityManager("api/teaminfo");
    manager.enableSaveQueuing(true);
    var dataservice = {
        getTeams: getTeams,
        createTeam: createTeam,
        deleteTeam: deleteTeam,
        saveEntity: saveEntity
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
    function deleteTeam(team) {
        team.entityAspect.setDeleted();
        return saveEntity(team);
    }
    function saveEntity(masterEntity) {
        // if nothing to save, return a resolved promise
        if (!manager.hasChanges()) { return Q(); }

        var description = describeSaveOperation(masterEntity);
        return manager.saveChanges().then(saveSucceeded).fail(saveFailed);

        function saveSucceeded() {
            logger.log("saved " + description);
        }

        function saveFailed(error) {
            var msg = "Error saving " +
                description + ": " +
                getErrorMessage(error);

            masterEntity.errorMessage = msg;
            logger.log(msg, 'error');
            // Let user see invalid value briefly before reverting
            $timeout(function () { manager.rejectChanges(); }, 1000);
            throw error; // so caller can see failure
        }
    }
    function describeSaveOperation(entity) {
        var statename = entity.entityAspect.entityState.name.toLowerCase();
        var typeName = entity.entityType.shortName;
        var title = entity.title;
        title = title ? (" '" + title + "'") : "";
        return statename + " " + typeName + title;
    }
    function getErrorMessage(error) {
        var reason = error.message;
        if (reason.match(/validation error/i)) {
            reason = getValidationErrorMessage(error);
        }
        return reason;
    }
    function getValidationErrorMessage(error) {
        try { // return the first error message
            var firstItem = error.entitiesWithErrors[0];
            var firstError = firstItem.entityAspect.getValidationErrors()[0];
            return firstError.errorMessage;
        } catch (e) { // ignore problem extracting error message 
            return "validation error";
        }
    }

    function configureBreeze() {
        // configure to use the model library for Angular
        breeze.config.initializeAdapterInstance("modelLibrary", "backingStore", true);

        // configure to use camelCase
        breeze.NamingConvention.camelCase.setAsDefault();

        // configure to resist CSRF attack
        var antiForgeryToken = $("#antiForgeryToken").val();
        if (antiForgeryToken) {
            // get the current default Breeze AJAX adapter & add header
            var ajaxAdapter = breeze.config.getAdapterInstance("ajax");
            ajaxAdapter.defaultSettings = {
                headers: {
                    'RequestVerificationToken': antiForgeryToken
                },
            };
        }
    }
}]);
