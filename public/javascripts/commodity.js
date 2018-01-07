
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

function createConfig(details, date, data) {
	return {
		type: 'line',
		data: {
			labels: date,
			datasets: [{
				label: details.label,
				steppedLine: details.steppedLine,
        		data: data,
				borderColor: details.color,
				fill: false,
			}]
		},
		options: {
			responsive: true,
			title: {
				display: true,
				text: details.label,
			}
		}
	};
}

function drawChart(date, data) {
    var container = document.querySelector('.container');

    var setting = {
        steppedLine: true,
        label: 'Price',
        color: window.chartColors.green
    };

    var div = document.createElement('div');
    div.classList.add('chart-container');

    var canvas = document.createElement('canvas');
    div.appendChild(canvas);
    container.appendChild(div);

    var ctx = canvas.getContext('2d');
    var config = createConfig(setting, date, data);
    new Chart(ctx, config);
}

function drawTable(prices) {
    var container = document.querySelector('.container');

    var table = document.createElement('table');
    table.classList.add('table');
    table.classList.add('table-striped');

    var tbody = document.createElement('tbody');
    tbody.setAttribute('id', 'commodity_tbody');

    var tr = document.createElement('tr');
    var th_price = document.createElement('th');
    var th_date = document.createElement('th');
    var th_price_content = document.createTextNode("Price");
    var th_date_content = document.createTextNode("Date");

    th_price.appendChild(th_price_content);
    th_date.appendChild(th_date_content);
    tr.appendChild(th_price);
    tr.appendChild(th_date);
    tbody.appendChild(tr);
    table.appendChild(tbody);
    container.appendChild(table);

    for (i in prices) {
        var priceObj = prices[i];

        var commodity_price_td = "<td>" + Math.round(priceObj['price']*100)/100 + "</td>"
        var commodity_date_td = "<td>" + priceObj['date'] + "</td>"
        $('#commodity_tbody').append("<tr>" + commodity_price_td + commodity_date_td + "</tr>");

    }
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

        //  draw chart
        var chart_date = [];
        var chart_prices = [];
        var i = 0;
        if (prices.length >= 30) {
            i = prices.length - 30;
        }
        for (; i < prices.length; i++) {
            var priceObj = prices[i];
            chart_date.push(priceObj['date']);
            chart_prices.push(Math.round(priceObj['price']*100)/100);
        }

        drawChart(chart_date, chart_prices);

        //  draw table
        drawTable(prices);

    });
});
