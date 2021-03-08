// Client side

// Every 10th of a second, gets the json at port 3000
// And updates the circle

// JQuerey ready
$( document ).ready(function() {

    // Initilizees the svg we're putting circles onto
    var svg = d3.select("#circle").append("svg")
    .attr("width",300)
    .attr("height", 200);

    // We're ready, draws inital cirlle with base values
	console.log("DOM Ready");
    drawCircle({v:[1,1]},svg);

    // Loop
	var interval = function() {
    	setTimeout(function() {
        
        // AJAX call that gets data from the provided url (port 3000 for us)
        $.ajax({
        	url: "http://localhost:3000/",
        	cache: false,
        	data: "",

        }).done(function(data) {
            // updates the circle with the current data
            drawCircle(data,svg);
            interval();
        });
    	}, 100// Interval time
    );
	};

	interval();

});	

// Draws and updates circle
function drawCircle(data,svg){
    // Makes the cirlce html, and runs the updates
    var circle = svg.selectAll("circle").data(data.v, function(d){
        return d;
    });

    // Removes circles if there is only one (like in the python example)
    circle.exit().remove();

    // Adds a circle, using the data from data as the radius
    circle.enter().append("circle").
    attr("cx",function(d,i){return i * 100 + 100;})
    .attr("cy",100)
    .attr("r",function(d){return d * 2 + 20
    });
    
}