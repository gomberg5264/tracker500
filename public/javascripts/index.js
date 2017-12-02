
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

function deleteUrl(url_value, callback) {
    $.ajax({
        type: "delete",
        url:"/api/urls/",
        async: true,
        dataType:"json",
        data:{"url":url_value},
        success: function(data) {
            callback(data);
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

            var url_id_td = "<td class='commodity_id'><a href='/commodity/" + urlObj['c_id'] + "'>" + urlObj['c_id'] + "</a></td>";
            var url_url_td = "<td class='commodity_url'><a href='" + urlObj['c_url'] + "'>" + urlObj['c_url'] + "</a></td>";
            var update_td = "<td><a href='#'><i class='fa fa-pencil' aria-hidden='true'></i>&nbsp; Update</a></td>";
            var delete_td = "<td class='delete_url_btn'><a href='#'><i class='fa fa-trash' aria-hidden='true'></i>&nbsp; Delete</a></td>";
            $('#url_tbody').append("<tr>" + url_id_td + url_url_td + update_td + delete_td + "</tr>")
        }

        // $(".commodity_url").click(function () {
        //     //  save the commodity url to Browser session
        //     localStorage.setItem("c_url", $(this).prev().next().text());
        //     //  jump to commodity page
        //     var commodity_id = $(this).prev().text();
        //     console.log("click on url id : " + commodity_id);
        //     window.location.href = "/commodity/" + commodity_id;
        // });

        $('.delete_url_btn').on('click', function(){

            var commodity_url = $(this).prev().prev().text();
            var msg = "Are you sure to delete the url '" + commodity_url + "' ?";
            if (confirm(msg) == true) {
                deleteUrl(commodity_url, function (){
                    console.log("delete url successfully: " + commodity_url);
                    window.location.href = "/";
                });
                return true;
    		}
    		else {
    			return false;
    		}
        });
    });

});
