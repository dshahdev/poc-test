function MyMessage() {

    this.get = function(req,res){

         var result = {'message': 'message from restful/test'};
         res.send(result);
    }
}
module.exports = new MyMessage();