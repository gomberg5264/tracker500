
function submitUrl(callback) {
    var url_value = $("#url_input").val();
    if(url_value === "") {
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
                callback(data['data']);
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

function deleteUrl(c_id, callback) {
    $.ajax({
        type: "delete",
        url:"/api/urls/" + c_id,
        async: true,
        dataType:"json",
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

function onCancelButton() {

    var commodity_url = '26';//$(this).parent().prev().text();
    var commodity_id = 'https://www.google.com';//$(this).attr('id').substring("update_btn_".length);
    var url_url_td = "<a href='" + commodity_url + "'>" + commodity_id + "</a>";
    $(this).parent().html(url_url_td);
}

$('document').ready(function(){

    $("#url_submit_btn").on('click', function() {
        submitUrl((data)=>{

            $("#url_input").val("");

            var url_id_td = "<td url = '" + data['c_url'] + "'>" + data['c_id'] + "</td>";
            var url_title_td = "<td><a class='title_td' href='/commodity/" + data['c_id'] + "'>" + data['c_url'] + "</a></td>";
            var update_td = "<td><button class='btn btn-primary update_url_btn' type='submit' id='update_btn_" + data['c_id'] + "' state='pre_update'>update</button></td>";
            var delete_td = "<td><button class='btn btn-primary delete_url_btn' type='submit' id='delete_btn_" + data['c_id'] + "'>delete</button></td>";

            $('#url_tbody').append("<tr id='tr_" + data['c_id'] + "'>" + url_id_td + url_title_td + update_td + delete_td + "</tr>");
        });
    });

    listAllUrls((data)=>{
        for (i in data) {
            var urlObj = data[i];
            if (urlObj['c_title'] === '') {
                var url_id_td = "<td url = '" + urlObj['c_url'] + "'>" + urlObj['c_id'] + "</td>";
                var url_title_td = "<td><a class='title_td' href='/commodity/" + urlObj['c_id'] + "'>" + urlObj['c_url'] + "</a></td>";
            }
            else {
                var url_id_td = "<td url = '" + urlObj['c_url'] + "' title = '" + urlObj['c_title'] + "'>" + urlObj['c_id'] + "</td>";
                var url_title_td = "<td><a class='title_td' href='/commodity/" + urlObj['c_id'] + "'>" + urlObj['c_title'] + "</a></td>";
            }
            var update_td = "<td><button class='btn btn-primary update_url_btn' type='submit' id='update_btn_" + urlObj['c_id'] + "' state='pre_update'>update</button></td>";
            // var update_td = "<td class='update_url_btn'><a href='#'><i class='fa fa-pencil' aria-hidden='true'></i>&nbsp; Update</a></td>";
            // var delete_td = "<td class='delete_url_btn'><a href='#'><i class='fa fa-trash' aria-hidden='true'></i>&nbsp; Delete</a></td>";
            var delete_td = "<td><button class='btn btn-primary delete_url_btn' type='submit' id='delete_btn_" + urlObj['c_id'] + "'>delete</button></td>";
            $('#url_tbody').append("<tr id='tr_" + urlObj['c_id'] + "'>" + url_id_td + url_title_td + update_td + delete_td + "</tr>")
        }

        $('#url_tbody').on('click', '.title_td', function(){
            var commodity_url = $(this).parent().prev().attr('url');
            localStorage.setItem("c_url", commodity_url);
        });

        $('#url_tbody').on('click', '.delete_url_btn', function(){

            var commodity_id = $(this).attr('id').substring("delete_btn_".length);
            var commodity_url = $(this).parent().prev().prev().prev().attr('url');
            var msg = "Are you sure to delete the url '" + commodity_url + "' ?";
            if (confirm(msg) == true) {
                deleteUrl(commodity_id, function (){
                    console.log("delete url successfully: " + commodity_url);
                    $("#tr_" + commodity_id).remove();
                });
                return true;
    		}
    		else {
    			return false;
    		}
        });

        $('#url_tbody').on('click', '.update_url_btn', function(){
            var state = $(this).attr('state');
            if (state === 'pre_update') {
                //  reset state
                $(this).attr('state', 'update');
                $(this).text('submit');

                var commodity_url = $(this).parent().prev().prev().attr('url');
                var commodity_id = $(this).attr('id').substring("update_btn_".length);
                var input_td = "<input class='form-control' type='text' id='url_input_" + commodity_id
                    + "' value='" + commodity_url + "'><button class='btn btn-outline-primary cancel_url_btn' type='submit' id='cancel_btn_"
                    + commodity_id + "' url='" + commodity_url + "'>cancel</button>";
                $(this).parent().prev().html(input_td);
            }
            else if (state === 'update') {

                var commodity_url = $(this).parent().prev().children('input').val();
                var commodity_id = $(this).attr('id').substring("update_btn_".length);

                if(commodity_url === "") {
                    alert("No parameter");
                }
                else if(!isAmazonUrl(commodity_url)) {
                    alert("not a amazon URL");
                }
                else {
                    //  reset state
                    $(this).attr('state', 'pre_update');
                    $(this).text('update');

                    updateUrl(commodity_id, commodity_url, ()=>{
                        var url_title_td = "<a href='/commodity/" + commodity_id + "'>" + commodity_url + "</a>";
                        $(this).parent().prev().html(url_title_td);
                        $(this).parent().prev().prev().attr('url', commodity_url);
                    });
                }
            }
        });
    });

    //  dynamic button click event
    $(document).on('click', '.cancel_url_btn', function(){
        var commodity_url = $(this).parent().prev().attr('url');
        var commodity_title = $(this).parent().prev().attr('title');
        if (commodity_title === undefined) {
            commodity_title = commodity_url;
        }
        var commodity_id = $(this).attr('id').substring("cancel_btn_".length);
        var url_title_td = "<a href='/commodity/" + commodity_id + "'>" + commodity_title + "</a>";
        $(this).parent().next().children('.update_url_btn').attr('state', 'pre_update');
        $(this).parent().next().children('.update_url_btn').text('update');
        $(this).parent().html(url_title_td);
    });

});
