app.controller("addDataController", ['$scope','addDataService', '$rootScope', function($scope, addDataService, $rootScope){


    function Book(id, bName, aName, isb, tBooks,pDate, cate, issBook, status) {
        this.ID = id;
        this.BookName = bName;
        this.AuthorName = aName;
        this.Isbn = isb;
        this.TotalBooks = tBooks;
        this.PublishDate = pDate;
        this.Category = cate;
        this.BooksIssued = issBook;
        this.Status = status;
    }

    $scope.newBook = new Book(0,"","","",0,"","",0,"");

    $scope.addData = function() {
        // get data object from add template
        // pass to the service
        // service passes that object to the restful and save into json file

        console.log(JSON.stringify($scope.newBook));

        addDataService.addData($scope.newBook).then(
            function(response){
                var obj = response.data;
                console.log(JSON.stringify(obj));

                $scope.newBook.ID = obj.addedID;

                $rootScope.$broadcast('bookAdded', $scope.newBook);



            }, function(error){

            })

    }

    $scope.fillData = function() {
        $scope.newBook = new Book(0,"bn","an","Isbn",10,"2017-01-01","Thriller",2,"");
    }

}]);

