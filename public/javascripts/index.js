
$('document').ready(function(){

    $("#url_submit_btn").click(function() {

        var url_value = $("#url_input").val();
        if(url_value === "" || url_value === "http://") {
            alert("No parameter");
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
    });

});
