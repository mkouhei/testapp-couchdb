$(function() {
    $("form#regist input:submit").click(function(e) {
        event.preventDefault();

        var data = {};
        data.date = $("input#date").val();
        data.amount = $("input#amount").val();
        data.comment = $("textarea").val();
        var serializedJSON = JSON.stringify(data);

        new $.ajax({
            url: "/testdb/",
            type: "POST",
            data: serializedJSON,
            contentType: "application/json",
            dataType: "json",
            sucess: function(data, dataType) {
		console.log("returned: " + data);
                console.log(dataType);
		$("form").replaceWith("<p>ドキュメント作成成功しました。</p>");
	    },
            error: function(xhr, textStatus, errorThrown) {
		console.log(xhr.status);
                console.log(textStatus);
		$("form").replaceWith("<p>ドキュメント作成失敗しました。</p>");
	    },
            complete: function(xhr, textStatus) {
		console.log(xhr.status);
                console.log(textStatus);
		$("form").replaceWith("<p>ドキュメント作成完了しました。</p>");
	    }
        });
    });


    $("form#replication input:submit").click(function(e) {
        event.preventDefault();

        var data = {};
        var source = $("input#source").val();
        var sourcedb = $("input#sourcedb").val();
	var sourceport = $("input#sourceport").val();
	if (targetport == "80") {
            data.source = 'http://' + source + '/' + sourcedb;
	} else if (targetport == "443") {
            data.source = 'https://' + source + '/' + sourcedb;
	} else {
	    data.source = 'http://' + source + ':' + sourceport + '/' + sourcedb;
	}

        var admin = $("input#admin").val();
        var pw = $("input#password").val();
        var target =  $("input#target").val();
        var targetdb =  $("input#targetdb").val();
	var targetport = $("input#targetport").val();
	if (targetport == "80") {
            data.target = 'http://' + admin + ':' + pw + '@' + target +
		'/' + targetdb;
	} else if (targetport == "443") {
            data.target = 'https://' + admin + ':' + pw + '@' + target +
		'/' + targetdb;
	} else {
            data.target = 'http://' + admin + ':' + pw + '@' + target +
		':' + targetport + '/' + targetdb;
	}
        var serializedJSON = JSON.stringify(data);

        new $.ajax({
            url: 'http://127.0.0.1:5984/_replicate',
            type: "POST",
            data: serializedJSON,
            contentType: "application/json",
            dataType: "json",
            sucess: function(data, dataType) {
		console.log("returned: " + data);
                console.log(dataType);
		$("form").replaceWith("<p>レプリケーション成功しました。</p>");
	    },
            error: function(xhr, textStatus, errorThrown) {
		console.log(xhr.status);
                console.log(textStatus);
		$("form").replaceWith("<p>レプリケーション失敗しました。</p>");
	    },
            complete: function(xhr, textStatus) {
		console.log(xhr.status);
                console.log(textStatus);
		$("form").replaceWith("<p>レプリケーション完了しました。</p>");
	    }
        });
    });
});