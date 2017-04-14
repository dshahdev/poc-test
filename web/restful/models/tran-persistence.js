var jsonfile = require('jsonfile');

const  DATA_PATH = '../../data/';
const  TRAN_FILE = DATA_PATH + 'trans.json';
const  FILE_OPTIONS = {encoding: "utf8",mode: 0o666,flag: "w+"};

var tranCache = {};
var tranCacheByBook = {};

function TranPersistence() {

    this.getTranData = function(req,res){

        jsonfile.readFile(TRAN_FILE, function(err, obj) {

            tranCache = {};
            tranCacheByBook = {};


            for(var i = 0; i < obj.length; i++){
                var myobj = obj[i];



                var tranObj = {};

                if(tranCache[myobj.GroupID] != null) {

                    tranObj = tranCache[myobj.GroupID];

                } else{


                    tranObj = {"ID": myobj.ID, "BookID": myobj.BookID, "IssueDate": "", "ReturnDate": "",
                                "Data": [{dummy: 0},{dummy: 1}]};
                }

                if(myobj.TranType == 'I') {

                    tranObj.IssueDate = myobj.TranDate;
                    tranObj.Data[0] = myobj;
                } else if (myobj.TranType == 'R') {

                    tranObj.ReturnDate = myobj.TranDate;
                    tranObj.Data[1] = myobj;
                } else {
                    console.log('error in data? getting tranType other than I or R');
                }


                tranCache[myobj.GroupID] = tranObj;


            }

            for(var group in tranCache ) {
                // console.log(JSON.stringify(tranCache[group]));
                var tranObj = tranCache[group];
                if(tranCacheByBook[tranObj.BookID] != null) {
                    tranCacheByBook[tranObj.BookID].push(tranObj);
                } else {
                    tranCacheByBook[tranObj.BookID] = [tranObj];
                }
            }
            res.send(tranCacheByBook);
        });


    };


    this.addTran = function(req, res) {

        var tranToAppend = req.body;

        if(tranCache.length > 0) {
            tranToAppend.ID = tranCache[tranCache.length - 1].ID + 1;
            console.log("id: "+ tranToAppend);
        } else {
            tranToAppend.ID = 1;
        }
        tranCache.push(tranToAppend);

        console.log(JSON.stringify(tranToAppend));

        jsonfile.writeFile(
            TRAN_FILE,
            tranCache,
            FILE_OPTIONS,
            function (err) {
                if (err) {
                    res.send({status: 1, message: 'write to json file failed, filename is ' + TRAN_FILE});
                } else {
                    res.send({status: 0, addedID: tranCache[tranCache.length - 1].ID });
                }
            }
        )
    };

    this.editTran = function(req, res) {

        var tranToEdit = req.body;

        for( var i = 0; i < tranCache.length; i++) {
            if(tranToEdit.ID === tranCache[i].ID) {
                tranCache[i].TotalBooks = tranToEdit.TotalBooks;
                break;
            }

        }

        jsonfile.writeFile(
            TRAN_FILE,
            tranCache,
            FILE_OPTIONS,
            function (err) {
                if (err) {
                    res.send({status: 1, message: 'write to json file failed, filename is ' + TRAN_FILE});
                } else {
                     res.send({status: 0, message: "write after edit done"});

                }
            }
        )
    }



}
module.exports = new TranPersistence();


