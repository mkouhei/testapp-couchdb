$(function() {

    // delete document
    $("input:button#delete").click(function(e){
        event.preventDefault();
        $("a#edit").css("display","none");

        // set URL
        var url = $('form#doc').attr('action') + '?rev=' +
            $('input#_rev').val();

        // Ajax process
        ajaxProcess(url, "DELETE", "");
    });

    // create / update document
    $("form#regist input:button#submit").click(function(e) {
        event.preventDefault();

        var httpMethod = 'POST';
        var data = {};

        if ($("input#_rev").length) {
            data._rev = $("input#_rev").attr('value');
            httpMethod = 'PUT';
        }
        // set URL
        var url = $("form#regist").attr("action");

        data.date = $("input#date").val();
        data.amount = $("input#amount").val();
        data.comment = $("textarea").val();

        // sirialize JSON
        var serializedJSON = JSON.stringify(data);

        // Ajax process
        ajaxProcess(url, httpMethod, serializedJSON);
    });

    // set Date
    function getYYYYMMDD() {
        var dtNow = new Date();
        dtMonth = dtNow.getMonth() + 1;
        dtDate = dtNow.getDate();
        dtHours = dtNow.getHours();
        dtMinutes = dtNow.getMinutes();
        dtSeconds = dtNow.getSeconds();
        if (dtMonth < 10) dtMonth = "0" + dtMonth;
        if (dtDate < 10) dtDate = "0" + dtDate;
        var strDate = dtNow.getFullYear() + "-" + dtMonth + "-" + dtDate;
        return strDate;
    }
    if ( !$("input#date").val() ) {
        $("input#date").val(getYYYYMMDD());
    }

    // ajax process
    function ajaxProcess(url, type, data) {
        var str;
        var identifier = "form#regist";

        switch (type) {
        case "POST":
            str = "登録";
            break;
        case "PUT":
            str = "更新";
            break;
        case "DELETE":
            str = "削除";
            identifier = "form#doc";
            break;
        default:
            str = "処理";
        }
        new $.ajax({
            url: url,
            type: type,
            data: data,
            contentType: "application/json",
            dataType: "json",
            sucess: function(data, dataType) {
                console.log("returned: " + data);
                console.log(dataType);
                $(identifier).replaceWith("<p>" + str + "成功しました。</p>");
            },
            error: function(xhr, textStatus, errorThrown) {
                console.log(xhr.status);
                console.log(textStatus);
                $(identifier).replaceWith("<p>" + str + "失敗しました。</p>");
            },
            complete: function(xhr, textStatus) {
                console.log(xhr.status);
                console.log(textStatus);
                $(identifier).replaceWith("<p>" + str + "完了しました。</p>");
                $("head").append('<META http-equiv="refresh" CONTENT="2;URL=/testdb/_design/testapp/index.html">');
            }
        });
    }

    $("form#replication input:button").click(function(e) {
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