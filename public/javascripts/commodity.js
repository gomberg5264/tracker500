
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

function createConfig(details, data) {
	return {
		type: 'line',
		data: {
			labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6'],
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

function drawChart() {
    var container = document.querySelector('.container');

    var data = [
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor()
    ];

    var setting = {
        steppedLine: true,
        label: 'Step Before Interpolation',
        color: window.chartColors.green
    };

    var div = document.createElement('div');
    div.classList.add('chart-container');

    var canvas = document.createElement('canvas');
    div.appendChild(canvas);
    container.appendChild(div);

    var ctx = canvas.getContext('2d');
    var config = createConfig(setting, data);
    new Chart(ctx, config);
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

    drawChart();
});
