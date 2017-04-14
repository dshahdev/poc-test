'use strict';

app.factory("editDataService", ['$http', '$q', function($http, $q){

    function editData(editBook) {
        var request = $http({
            url:"/restful/persistence/editbook",
            method:"POST",
            data: editBook,
            headers: {
                'Content-Type': 'application/json'
            }

        });

        return sendRequest(request);
    }

    function sendRequest(config) {

        var deferred = $q.defer();
        config.then(
            function(response){

                deferred.resolve(response);

            }, function(error) {

                deferred.reject(error);
            })

        return deferred.promise;
    }

    return {

        editData: editData
    }
}]);