
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

            var url_id_td = "<td class='urllist_id'>" + urlObj['c_id'] + "</td>";
            var url_url_td = "<td class='urllist_url'>" + urlObj['c_url'] + "</td>";
            var update_td = "<td><a href='#'><i class='fa fa-pencil' aria-hidden='true'></i>&nbsp; Update</a></td>";
            var delete_td = "<td><a href='#'><i class='fa fa-trash' aria-hidden='true'></i>&nbsp; Delete</a></td>";
            $('#url_tbody').append("<tr>" + url_id_td + url_url_td + update_td + delete_td + "</tr>")
        }

        $(".urllist_url").click(function () {
            var url_id = $(this).prev().text();
            console.log("click on url id : " + url_id);
            window.location.href = "/commodity/" + url_id;
        });
    });

});
