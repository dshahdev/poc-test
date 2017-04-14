'use strict';

app.controller("mainController", function($scope, dataService, $rootScope, $state){

    $scope.name = "Darshan";
    $scope.bookDetails = [];
    $scope.idSelected = null;
    $scope.selectedBook = null;
    $scope.lastBookID = 0;
    $scope.editBookElement = "";

    $scope.$on('bookAdded', function(event, args) {

        $scope.bookDetails.push(args);

        console.log("book added in AddController, now adding in the list as well ID is " + args.ID);

        $state.go('otherwise');
    });

    $scope.$on('number of books are changed', function(event, args) {

        $scope.editedRow = args;
        console.log("edited data " + JSON.stringify($scope.editedRow));
        console.log("selectedRow: "+ JSON.stringify($scope.selectedBook.TotalBooks));

        $scope.selectedBook.TotalBooks = $scope.editedRow.TotalBooks;

        console.log("bookDetails >> Array: "+JSON.stringify($scope.bookDetails));

        // for(var i = 0; i < bookDetails.length; i++) {

        // }

    })

    $scope.getBooksData = function() {
        dataService.getBooksData().then(
            function(response){

                $scope.bookDetails = response.data;
                if($scope.bookDetails.length > 0) {

                    $scope.bookClick($scope.bookDetails[0]);
                    $scope.lastBookID = $scope.bookDetails[$scope.bookDetails.length - 1].ID;
                    console.log("id: "+$scope.lastBookID);

                }


            }, function(error){


            });

    }

    $scope.rowSelected = null;

    $scope.bookClick = function(book) {

        console.log('book clicked, here is the json object for book >> ' + JSON.stringify(book));
        $scope.idSelected = book.ID;
        $scope.selectedBook = book;
        //broadcast
        $rootScope.$broadcast('idSelected',book);

    };

    $scope.getBooksData();
})