function(doc, req) {  
    start({
	"headers" : {
	    "Content-type": "text/html"
	}
    });
    
    var mustache = require("vendor/couchapp/lib/mustache");

    data = {
	_id: doc._id,
	_rev: doc._rev,
	date: doc.date,
	amount: doc.amount,
	comment: doc.comment
    };
    
    return mustache.to_html(this.templates.detail2, data);
}