﻿teamTaskManager.factory('dataservice', ['logger', '$timeout', function (logger, $timeout) {

    breeze.config.initializeAdapterInstance("modelLibrary", "backingStore", true);
    var removeItem = breeze.core.arrayRemoveItem;
    logger.log("creating datacontext");
    var initialized;

    configureBreeze();
    var manager = new breeze.EntityManager("api/teaminfobreeze");
    manager.enableSaveQueuing(true);
    var dataservice = {
        getEntities: getEntities,
        createEntity: createEntity,
        deleteEntity: deleteEntity,
        saveEntity: saveEntity,
        extendItem: extendItem,
        deleteEntityFromCollection: deleteEntityFromCollection,
        addEntityToCollection: addEntityToCollection,
        completeEntityEdit: completeEntityEdit,
        getEntity: getEntity,
        addExistingEntityToCollection: addExistingEntityToCollection
        
    };
    return dataservice;

    /*** implementation details ***/

    //#region main application operations
    function querySucceeded(data, objectToModify, isCollection, refreshFunction, callWhenCompleted) {
        if (isCollection) {
            data.results.forEach(function (item) {
                dataservice.extendItem(item);
                objectToModify.push(item);
            });
        }
        else {
            dataservice.extendItem(data);
            objectToModify.inner = data;
        }
        refreshFunction();
        if (typeof (callWhenCompleted) !== 'undefined') {
            callWhenCompleted();
        }

    }
    function queryFailed(error) {
        logger.error(error.message, "Query failed");
    }
    function getEntities(pluralName, collectionToModify, refreshFunction, queryAdditions, isCollection, callWhenCompleted) {
        var query = breeze.EntityQuery.from(pluralName);
        if (typeof (queryAdditions !== 'undefined')) {
            _.each(queryAdditions, function (addition) {
                
                var addType=addition.typeQ;
                if (addType=='where'){
                    query=query.where(addition.first, addition.second, addition.third);
                }
                else if(addType=='orderBy') {
                    query=query.orderBy(addition.first);
                }
                else if (addType == 'expand') {
                    query = query.expand(addition.first);
                }
                else if (addType == 'select') {
                    query = query.select(addition.first);
                }
            });
        }
        return manager.executeQuery(query).then(function (data) {
            if (typeof (isCollection) == 'undefined' || isCollection) {
                querySucceeded(data, collectionToModify, true, refreshFunction, callWhenCompleted);
                logger.info("Fetched " + pluralName);
            }
            else {
                querySucceeded(data.results[0], collectionToModify, false, refreshFunction);
                logger.info("Fetched " + pluralName);
            }
        }).fail(queryFailed);;
    }
    function getEntity(pluralName, queryAdditions) {
        var query = breeze.EntityQuery.from(pluralName);
        if (typeof (queryAdditions !== 'undefined')) {
            _.each(queryAdditions, function (addition) {

                var addType = addition.typeQ;
                if (addType == 'where') {
                    query = query.where(addition.first, addition.second, addition.third);
                }
                else if (addType == 'orderBy') {
                    query = query.orderBy(addition.first);
                }
                else if (addType == 'expand') {
                    query = query.expand(addition.first);
                }
                else if (addType == 'select') {
                    query = query.select(addition.first);
                }
            });
        }
        return manager.executeQuery(query);
    }
    function createEntity(entityName, initialValues) {
        return manager.createEntity(entityName, initialValues);
    }
    function deleteEntity(entity) {
        entity.entityAspect.setDeleted();
        return saveEntity(entity);

    }
    function extendItem(item) {
        if (item.isEditing !== undefined) return; // already extended

        item.isEditing = false;

        // listen for changes with Breeze PropertyChanged event
        if (typeof (item.entityAspect) !== 'undefined') {
            item.entityAspect.propertyChanged.subscribe(function () {
                if (item.isEditing || suspendItemSave) { return; }
                // give EntityManager time to hear the change
                setTimeout(function () { saveIfModified(item); }, 0);
            });
        }
        else {
            item.entity.entityAspect.propertyChanged.subscribe(function () {
                if (item.isEditing || suspendItemSave) { return; }
                // give EntityManager time to hear the change
                setTimeout(function () { saveIfModified(item); }, 0);
            });
        }
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
    function deleteEntityFromCollection(entity, collection, refreshFunction) {
        removeItem(collection, entity);
        dataservice.deleteEntity(entity)
            .then(function () {
                logger.info('Delete succeeded');
            })
            .fail(deleteFailed)
            .fin(refreshFunction);

        function deleteFailed() {
            collection.unshift(entity);
            logger.error('Delete failed');
        }
    };
    function addEntityToCollection(entityName, propertyList, collection, refreshFunction) {
        var entity = dataservice.createEntity(entityName);
        _.each(propertyList, function (property) {
            entity[property.name] = property.value;
        });
        dataservice.saveEntity(entity)
            .then(addSucceeded)
            .fail(addFailed)
            .fin(refreshFunction);

        function addSucceeded() {
            collection.unshift(entity);
            logger.info(entityName + ' added');
        }

        function addFailed(error) {
            failed({ message: "Save of new " + entityName + " failed" });
        }
    };
    function addExistingEntityToCollection(collection, entity, refreshFunction) {
        collection.push(entity);
        dataservice.saveEntity(entity)
            .then(addSucceeded)
            .fail(addFailed)
            .fin(refreshFunction);

        function addSucceeded() {
            logger.info(entityName + ' added');
        }

        function addFailed(error) {
            failed({ message: "Save of new " + entityName + " failed" });
        }
    };
    function completeEntityEdit(entity, refreshFunction) {
        saveEntity(entity).fin(refreshFunction);
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
