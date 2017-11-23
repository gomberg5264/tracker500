
function listAllPrices(url_id, callback) {
    $.ajax({
        type: "get",
        url:"/api/commodity/" + url_id,
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

    var commodity_id = $('.hidden_id').text();
    listAllPrices(commodity_id, (data)=>{
        for (i in data) {
            var price = data[i];
            console.log(price);
            // var url_id_td = "<td class='urllist_id'>" + urlObj['c_id'] + "</td>";
            // var url_url_td = "<td class='urllist_url'>" + urlObj['c_url'] + "</td>";
            // var update_td = "<td><a href='#'><i class='fa fa-pencil' aria-hidden='true'></i>&nbsp; Update</a></td>";
            // var delete_td = "<td><a href='#'><i class='fa fa-trash' aria-hidden='true'></i>&nbsp; Delete</a></td>";
            // $('#url_tbody').append("<tr>" + url_id_td + url_url_td + update_td + delete_td + "</tr>")
        }
    });

});
