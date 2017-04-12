'use strict';

app.controller("mainController", function($scope, dataService, $rootScope){

    $scope.name = "Darshan";
    $scope.bookDetails = [];
    $scope.idSelected = null;


    $scope.getBooksData = function() {
        dataService.getBooksData().then(
            function(response){

                $scope.bookDetails = response.data;

            }, function(error){


            });



    }
    $scope.rowSelected = null;

    $scope.bookClick = function(book) {

        console.log('book clicked, here is the json object for book >> ' + JSON.stringify(book));
        $scope.idSelected = book.ID;

        //broadcast


    };

    $scope.getBooksData();
})