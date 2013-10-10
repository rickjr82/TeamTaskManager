teamTaskManager.factory('teamDetail', ['$http', '$q',
            function ($http, $q) {
                return {
                    getCurrentUserPlayers: function (teamId) {
                        var deferred = $q.defer();
                        $http.get('/api/teaminfononbreeze/GetCurrentUserPlayers', { params: { teamId: teamId } }).success(function (data) {
                            deferred.resolve(data);
                        }).error(function () {
                            deferred.reject();
                        });
                        return deferred.promise;
                    },
                    getCurrentUserTeams: function () {
                        var deferred = $q.defer();
                        $http.get('/api/teaminfononbreeze/GetCurrentUserTeams').success(function (data) {
                            deferred.resolve(data);
                        }).error(function () {
                            deferred.reject();
                        });
                        return deferred.promise;
                    },
                    addPlayerToCurrentUser: function (playerId) {
                        var deferred = $q.defer();
                        $http.get('/api/teaminfononbreeze/AddPlayerToCurrentUser', { params: { playerId: playerId } }).success(function (data) {
                            deferred.resolve(data);
                        }).error(function () {
                            deferred.reject();
                        });
                        return deferred.promise;
                    },
                    removePlayerFromCurrentUser: function (playerId) {
                        var deferred = $q.defer();
                        $http.delete('/api/teaminfononbreeze/DeletePlayerFromCurrentUser', { params: { playerId: playerId } }).success(function (data) {
                            deferred.resolve(data);
                        }).error(function () {
                            deferred.reject();
                        });
                        return deferred.promise;
                    },
                    addTeamToCurrentUser: function (teamId) {
                        var deferred = $q.defer();
                        $http.get('/api/teaminfononbreeze/AddTeamToCurrentUser', { params: { teamId: teamId } }).success(function (data) {
                            deferred.resolve(data);
                        }).error(function () {
                            deferred.reject();
                        });
                        return deferred.promise;
                    },
                    removeTeamFromCurrentUser: function (teamId) {
                        var deferred = $q.defer();
                        $http.delete('/api/teaminfononbreeze/DeleteTeamFromCurrentUser', { params: { teamId: teamId } }).success(function (data) {
                            deferred.resolve(data);
                        }).error(function () {
                            deferred.reject();
                        });
                        return deferred.promise;
                    }


                };
            }]);
