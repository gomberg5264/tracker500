
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

        var title = data['title'];
        var prices = data['prices'];

        $(".main h3").text(title);

        for (i in prices) {
            var priceObj = prices[i];

            var commodity_price_td = "<td>" + Math.round(priceObj['price']*100)/100 + "</td>"
            var commodity_date_td = "<td>" + priceObj['date'] + "</td>"
            $('#commodity_tbody').append("<tr>" + commodity_price_td + commodity_date_td + "</tr>");

            // var url_id_td = "<td class='urllist_id'>" + urlObj['c_id'] + "</td>";
            // var url_url_td = "<td class='urllist_url'>" + urlObj['c_url'] + "</td>";
            // var update_td = "<td><a href='#'><i class='fa fa-pencil' aria-hidden='true'></i>&nbsp; Update</a></td>";
            // var delete_td = "<td><a href='#'><i class='fa fa-trash' aria-hidden='true'></i>&nbsp; Delete</a></td>";
            // $('#url_tbody').append("<tr>" + url_id_td + url_url_td + update_td + delete_td + "</tr>")
        }
    });

});
