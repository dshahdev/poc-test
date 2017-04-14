var persistence = require('./models/persistence');
var tran = require('./models/tran-persistence');

module.exports = {

    configure: function(app){

        app.get('/restful/persistence/getbookdata', function(req, res){
            persistence.getBookData(req, res);
        });

        app.post('/restful/persistence/addbook', function(req, res){
            persistence.addBook(req, res);
        });

        app.post('/restful/persistence/editbook', function(req, res){
            persistence.editBook(req, res);
        });

        app.get('/restful/tran/gettrandata', function(req, res){
            tran.getTranData(req, res);
        });

        app.post('/restful/tran/dotransaction', function(req, res){
            tran.doTransaction(req, res, persistence);
        });

    }
};
