var mydata = require('./models/mydata');
var myMessage = require('./models/myMessage');
var persistence = require('./models/persistence');

module.exports = {

    configure: function(app){

        app.get('/restful/test', function(req, res){
            myMessage.get(req,res);
        });

        app.get('/restful/selectdata', function(req, res){
            mydata.get(req, res);
        });

        app.get('/restful/persistence/getbookdata', function(req, res){
            persistence.getBookData(req, res);
        });

        app.post('/restful/persistence/addbook', function(req, res){
            persistence.saveTestData(req, res);
        });

    }
};
