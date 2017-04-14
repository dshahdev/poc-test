var jsonfile = require('jsonfile');

const  DATA_PATH = '../../data/';
const  BOOK_FILE = DATA_PATH + 'books.json';
const  TRAN_FILE = DATA_PATH + 'trans.json';
const  FILE_OPTIONS = {encoding: "utf8",mode: 0o666,flag: "w+"};

var bookCache = [];

function Persistence() {

    this.getBookData = function(req,res){

        jsonfile.readFile(BOOK_FILE, function(err, obj) {
            // console.dir(obj);
            bookCache = obj;
            res.send(obj);
        })


    };

    this.addBook = function(req, res) {

        var bookToAppend = req.body;

        if(bookCache.length > 0) {
            bookToAppend.ID = bookCache[bookCache.length - 1].ID + 1;
            console.log("id: "+ bookToAppend);
        } else {
            bookToAppend.ID = 1;
        }
        bookCache.push(bookToAppend);

        console.log(JSON.stringify(bookToAppend));

        jsonfile.writeFile(
            BOOK_FILE,
            bookCache,
            FILE_OPTIONS,
            function (err) {
                if (err) {
                    res.send({status: 1, message: 'write to json file failed, filename is ' + BOOK_FILE});
                } else {
                    res.send({status: 0, addedID: bookCache[bookCache.length - 1].ID });
                }
            }
        )
    };

    this.editBook = function(req, res) {

        var bookToEdit = req.body;

        for( var i = 0; i < bookCache.length; i++) {
            if(bookToEdit.ID === bookCache[i].ID) {
                bookCache[i].TotalBooks = bookToEdit.TotalBooks;
                break;
            }

        }

        jsonfile.writeFile(
            BOOK_FILE,
            bookCache,
            FILE_OPTIONS,
            function (err) {
                if (err) {
                    res.send({status: 1, message: 'write to json file failed, filename is ' + BOOK_FILE});
                } else {
                     res.send({status: 0, message: "write after edit done"});
                    // // res.send({status: 0, editedBook: bookCache[bookCache.length - 1] });
                    // res.send({status: 0, editedBook: bookToEdit});
                }
            }
        )
    }



}
module.exports = new Persistence();


