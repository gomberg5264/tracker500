
function submitUrl() {
    var url_value = $("#url_input").val();
    if(url_value === "" || url_value === "http://") {
        alert("No parameter");
    }
    else if(!isAmazonUrl(url_value)) {
        alert("not a amazon URL");
    }
    else {
        $.ajax({
            type: "post",
            url:"/api/urls/",
            async: true,
            dataType:"json",
            data:{"url":url_value},
            success: function(data) {
                alert("Success");
                $("#url_input").val("");
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                alert(XMLHttpRequest.status);
                alert(XMLHttpRequest.readyState);
                alert(textStatus);
            }
        });
    }
}

function listAllUrls(callback) {
    $.ajax({
        type: "get",
        url:"/api/urls/",
        async: true,
        dataType:"json",
        success: function(data) {
            callback(data['data']);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status);
            alert(XMLHttpRequest.readyState);
            alert(textStatus);
        }
    });
}

$('document').ready(function(){

    $("#url_submit_btn").click(function() {
        submitUrl();
    });

    listAllUrls((data)=>{
        for (i in data) {
            var urlObj = data[i];
            console.log(urlObj);
            $('.row').append("<div class='col-md-9 col-md-offset-3'> ID: " + urlObj['c_id']
                + ", URL: " + urlObj['c_url'] + "</div>");
        }
    });

});
