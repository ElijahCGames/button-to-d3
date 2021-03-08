$( document ).ready(function() {

    var svg = d3.select("#circle").append("svg")
    .attr("width",300)
    .attr("height", 200);

	console.log("DOM Ready");
    drawCircle({v:[1,1]},svg);

	var interval = function() {
    	setTimeout(function() {

        $.ajax({
        	url: "http://localhost:3000/",
        	cache: false,
        	data: "",

        }).done(function(data) {
            console.log(data);
            drawCircle(data,svg);
            interval();
        });

        /*d3.json("http://localhost:3000/", function(data) {
            console.log(data);
            interval();
        });*/

        

    	}, 1000// Interval time
    );
	};

	interval();

});	


function drawCircle(data,svg){
    var circle = svg.selectAll("circle").data(data.v, function(d){
        return d;
    });

    circle.exit().remove();

    circle.enter().append("circle").
    attr("cx",function(d,i){return i * 100 + 100;})
    .attr("cy",100)
    .attr("r",function(d){return d * 2 + 20
    });
    
}