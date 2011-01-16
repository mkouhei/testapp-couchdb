function(head, req) {
    start({
        "headers" : {"Content-type": "text/html"}
    });
    var mustache = require("vendor/couchapp/lib/mustache");

    var datalist = [];
    var row;
    while(row = getRow()) {
        datalist.push({
            _id: row.value._id,
            date: row.value.date,
            amount: row.value.amount,
            comment: row.value.comment
        });
    }
    var data = {"datalist": datalist}
    return mustache.to_html(this.templates.month, data);
}