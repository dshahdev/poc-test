var jsonfile = require('jsonfile');

const  DATA_PATH = '../../data/';
const  BOOK_FILE = DATA_PATH + 'books.json';
const  TRAN_FILE = DATA_PATH + 'trans.json';
const  FILE_OPTIONS = {encoding: "utf8",mode: 0o666,flag: "a+"};

function Persistence() {

    this.getBookData = function(req,res){

        jsonfile.readFile(BOOK_FILE, function(err, obj) {
            console.dir(obj);
            res.send(obj);
        })


    };

    this.addBookData = function(req, res) {

        var file = './test3.json';
        var obj = req.body;

        // console.log(JSON.stringify(obj));
        jsonfile.writeFile(
            BOOK_FILE,
            obj,
            FILE_OPTIONS,
            function (err) {
                if (err) {
                    res.send({status: 1, message: 'write to json file failed, filename is ' + BOOK_FILE});
                } else {
                    res.send({status: 0, message: 'write finished normally'});
                }
            }
        )
    };



}
module.exports = new Persistence();


