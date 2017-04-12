
function MyData() {
    this.get = function(req, res) {

        var result =  [
            {id: "1", bName: "xyz", aName: "zbc", isbn:"123456789", nBooks: 30, pDate: "2017/4/11", Category: "thriller", bIssued: 10},
            {id: "2", bName: "xyz", aName: "zbc", isbn:"123456789", nBooks: 30, pDate: "2017/4/11", Category: "thriller", bIssued: 10},
            {id: "3", bName: "xyz", aName: "zbc", isbn:"123456789", nBooks: 30, pDate: "2017/4/11", Category: "thriller", bIssued: 10},
            {id: "4", bName: "xyz", aName: "zbc", isbn:"123456789", nBooks: 30, pDate: "2017/4/11", Category: "thriller", bIssued: 10},
            {id: "5", bName: "xyz", aName: "zbc", isbn:"123456789", nBooks: 30, pDate: "2017/4/11", Category: "thriller", bIssued: 10}
        ]
        console.log('this is from mydata module');
        res.send(result);

    }
}

module.exports = new MyData();
