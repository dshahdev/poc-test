'use strict';

app.controller("mainController", function($scope, dataService, $rootScope, $state){

    $scope.name = "Darshan";
    $scope.bookDetails = [];
    $scope.idSelected = null;
    $scope.selectedBook = null;
    $scope.lastBookID = 0;
    $scope.editBookElement = "";

    $scope.$on('bookTransUpdated', function(event, args) {

        $scope.selectedBook.Status = args.Status;
        $scope.selectedBook.BooksIssued = args.BooksIssued;

    });

    $scope.$on('bookAdded', function(event, args) {

        $scope.bookDetails.push(args);
        $state.go('otherwise');

    });

    $scope.$on('bookEdited', function(event, args) {

        $scope.editedRow = args;
        $scope.selectedBook.TotalBooks = $scope.editedRow.TotalBooks;

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

                console.log("error: "+error);
            });

    }

    $scope.rowSelected = null;

    $scope.bookClick = function(book) {

        console.log('book clicked, here is the json object for book >> ' + JSON.stringify(book));
        $scope.idSelected = book.ID;
        $scope.selectedBook = book;
        //broadcast
        $rootScope.$broadcast('bookSelectionChanged',book);

    };

    $scope.deleteRow = function(selectedBook) {

        console.log("selectedBook in delete: " + selectedBook);
    }

    $scope.getBooksData();
})