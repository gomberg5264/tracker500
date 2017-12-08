
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

function updateUrl(commodity_id, url_value, callback) {
    $.ajax({
        type: "put",
        url:"/api/urls/" + commodity_id,
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
            var update_td = "<td class='update_url_btn'><a href='#'><i class='fa fa-pencil' aria-hidden='true'></i>&nbsp; Update</a></td>";
            // var delete_td = "<td class='delete_url_btn'><a href='#'><i class='fa fa-trash' aria-hidden='true'></i>&nbsp; Delete</a></td>";
            var delete_td = "<td><button class='btn btn-primary delete_url_btn' type='submit' id='delete_btn_" + urlObj['c_id'] + "'>delete</button></td>"
            $('#url_tbody').append("<tr id='tr_" + urlObj['c_id'] + "'>" + url_id_td + url_url_td + update_td + delete_td + "</tr>")
        }

        $('.delete_url_btn').on('click', function(){

            var commodity_id = $(this).attr('id').substring("delete_btn_".length);
            var commodity_url = $(this).parent().prev().prev().text();
            var msg = "Are you sure to delete the url '" + commodity_url + "' ?";
            if (confirm(msg) == true) {
                deleteUrl(commodity_url, function (){
                    console.log("delete url successfully: " + commodity_url);
                    $("#tr_" + commodity_id).remove();
                });
                return true;
    		}
    		else {
    			return false;
    		}
        });

        $('.update_url_btn').on('click', function(){

            var commodity_url = $(this).prev().text();
            var commodity_id = $(this).prev().prev().text();
            var msg = "id = " + commodity_id + ", url =" + commodity_url;
            alert(msg);
        });
    });

});
