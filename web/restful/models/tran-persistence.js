
var jsonfile = require('jsonfile');

const  DATA_PATH = '../../data/';
const  BOOK_FILE = DATA_PATH + 'books.json';
const  TRAN_FILE = DATA_PATH + 'trans.json';
const  FILE_OPTIONS = {encoding: "utf8",mode: 0o666,flag: "w+"};

var tranRawData = [];
var tranCache = {};
var tranCacheByBook = {};
var latestTranID = 0;

function TranPersistence() {

    this.getTranData = function(req,res){

        jsonfile.readFile(TRAN_FILE, function(err, obj) {

            tranCache = {};
            tranCacheByBook = {};
            tranRawData = obj;

            console.log("tranRawData length is " + tranRawData.length);

            for(var i = 0; i < tranRawData.length; i++){
                var myobj = tranRawData[i];



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

                latestTranID = ((latestTranID < myobj.ID) ? myobj.ID : latestTranID);

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

    this.doTransaction = function(req, res, bookPersist) {

        console.log("in doTransaction() tranRawData length is " + tranRawData.length);

        var bookObj = req.body.bookObj;
        var transactionType = req.body.type;

        latestTranID++;
        var curDate = (new Date()).toISOString().slice(0,10);
        var tranIssueDate = ((transactionType == "I") ? curDate: "");
        var tranReturnDate = ((transactionType == "R") ? curDate: "");
        var bookUpdateCount = ((transactionType == "I") ? 1: -1);
        var statusType = ((transactionType == "I") ? "Issue" : "Return" );
        var index = ((transactionType == "I") ? 0: 1);

        var tranObj = {};
        var newRawObj = { "ID":latestTranID, "BookID": bookObj.ID, "TranDate": curDate,
                            "TranType":transactionType, "GroupID":latestTranID };

        if (transactionType == "I") {
            tranObj = { "ID": latestTranID, "BookID": bookObj.ID,
                        "IssueDate": tranIssueDate, "ReturnDate": tranReturnDate,
                        "Data":
                            [ newRawObj,  {dummy: 1} ]
                       };
        }
        else {
            tranObj =  req.body.tranObj;
            tranObj.ReturnDate = tranReturnDate;
            newRawObj.GroupID = tranObj.Data[0].GroupID;
            tranObj.Data[1] = newRawObj;
        }

        bookDataCache = bookPersist.getBookCache();

        for( var i = 0; i < bookDataCache.length; i++) {
            if(bookObj.ID === bookDataCache[i].ID) {
                bookDataCache[i].BooksIssued = bookDataCache[i].BooksIssued + bookUpdateCount;
                bookDataCache[i].Status = statusType;
                bookObj = bookDataCache[i];
                break;
            }
        }

        if (tranRawData != null) {
            tranRawData.push(tranObj.Data[index]);
        } else {
            tranRawData = [tranObj.Data[index]];
        }

        console.log("new tran obj " + JSON.stringify(tranObj));

        tranCache[tranObj.GroupID] = tranObj;

        if(tranCacheByBook[tranObj.BookID] != null) {
            tranCacheByBook[tranObj.BookID].push(tranObj);
        } else {
            tranCacheByBook[tranObj.BookID] = [tranObj];
        }

        jsonfile.writeFile(
            BOOK_FILE,
            bookDataCache,
            FILE_OPTIONS,
            function (err) {
                if (err) {
                    res.send({status: 1, message: 'write to json file failed, filename is ' + BOOK_FILE});
                } else {
                }
            }
        )

        console.log(">>new tran obj after book data update " + JSON.stringify(tranRawData[tranRawData.length - 1]));

        jsonfile.writeFile(
            TRAN_FILE,
            tranRawData,
            FILE_OPTIONS,
            function (err) {
                if (err) {
                    res.send({status: 1, message: 'write to json file failed while issuing book, filename is ' + TRAN_FILE});
                } else {
                    var updatedTranObj = tranObj;
                    var updatedBookObj = bookObj;

                    res.send({"status": 0, "bookObj": updatedBookObj, "tranObj": updatedTranObj });
                }
            }
        )



    };



}
module.exports = new TranPersistence();


