
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
        var url = localStorage.getItem("c_url");
        if (title === '') {
            title = url;
        }
        $(".commodity_title").text(title);
        $(".commodity_title").attr('href', url);

        for (i in prices) {
            var priceObj = prices[i];

            var commodity_price_td = "<td>" + Math.round(priceObj['price']*100)/100 + "</td>"
            var commodity_date_td = "<td>" + priceObj['date'] + "</td>"
            $('#commodity_tbody').append("<tr>" + commodity_price_td + commodity_date_td + "</tr>");

        }
    });

});
