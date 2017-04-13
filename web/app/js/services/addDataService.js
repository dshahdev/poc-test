'use strict';

app.factory("addDataService", ['$http', '$q', function($http, $q){

    function addData(newBook) {
        var request = $http({
            url:"/restful/persistence/addbook",
            method:"POST",
            data: newBook,
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

        addData: addData
    }
}]);