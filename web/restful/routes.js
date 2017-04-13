var persistence = require('./models/persistence');

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

    }
};
