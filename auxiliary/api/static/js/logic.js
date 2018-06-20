d3.select(window).on("resize", makeResponsive);
makeResponsive();

function makeResponsive() {

    var svgArea = d3.select("body").select("svg");
    if (!svgArea.empty()) {
        svgArea.remove();
    }

    var svgWidth = window.innerWidth;
    var svgHeight = window.innerHeight;

    var margin = {
        top: 50,
        right: 70,
        bottom: 50,
        left: 70
        };
    
    var width = svgWidth - margin.left - margin.right;
    var height = svgHeight - margin.top - margin.bottom;
    
    var svg = d3
        .select("#graph")
        .append("svg")
        .attr("width", svgWidth)
        .attr("height", svgHeight);

    var chartGroup = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    d3.json('/sports', responce => {

        var parseTime = d3.timeParse("%Y")
        // var parseTime = d3.isoParse
        var data = responce[0];

        data.forEach(el => {
            el.Year = parseTime(el.Year);
            el.W = +el.W;
            el.Attendance = +el.Attendance;
            el.L = +el.L;
        });

        console.log(data)

        var xTimeScale = d3.scaleTime()
        .domain(d3.extent(data, d => d.Year)).nice()
        .range([0, width]);

        // var xTimeScale = d3.scaleBand()
        // .rangeRound([0, width], .05)
        // .padding(0.1)
        // .domain(data.map(function(d) { return d.Year; }));

        // var x1 = d3.scaleTime()
        // .rangeRound([0, width], 5);

        var yLinearScale1 = d3.scaleLinear()
        .domain([d3.min(data, d => d.W), d3.max(data, d => d.W)]).nice()
        .range([height, 0]);

        var yLinearScale2 = d3.scaleLinear()
        .domain([d3.min(data, d => d.Attendance), d3.max(data, d => d.Attendance)]).nice()
        .range([height, 0]);

        var color = d3.scaleOrdinal()
        .range(["#5DDEC9", "#EF64AD"]);

        var bottomAxis = d3.axisBottom(xTimeScale)
        .tickFormat(d3.timeFormat("%Y"));
        var leftAxis = d3.axisLeft(yLinearScale1);
        var rightAxis = d3.axisRight(yLinearScale2);

        chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis)
        .selectAll("text")	
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-45)");

        chartGroup.append("g")
        // Define the color of the axis text
        .classed("leftAxis", true)
        .call(leftAxis);

        chartGroup.append("g")
        .classed("rightAxis", true)
        .attr("transform", `translate(${width}, 0)`)
        .call(rightAxis);

        var att = ['Attendance']
        var win = ['W']

        chartGroup.append("g")
        .selectAll("g")
        .data(data)
        .enter().append("g")
        .attr("transform", function(d) { return "translate(" + xTimeScale(d.Year) + ",0)"; })
        .selectAll("rect")
        .data(function(d) { return att.map(function(key) { return {key: key, value: d[key]}; }); })
        .enter().append("rect")
        .attr("x", 5)
        // .attr("x", function(d,i) { return xTimeScale(i); })
        .attr("y", function(d) { return yLinearScale2(d.value); })
        .attr("width", width/data.length*0.4)
        .attr("height", function(d) { return height - yLinearScale2(d.value); })
        .attr("fill", function(d) { return color(d.key); });

        chartGroup.append("g")
        .selectAll("g")
        .data(data)
        .enter().append("g")
        .attr("transform", function(d) { return "translate(" + xTimeScale(d.Year) + ",0)"; })
        .selectAll("rect")
        .data(function(d) { return win.map(function(key) { return {key: key, value: d[key]}; }); })
        .enter().append("rect")
        // .attr("x", function(d,i) { return xTimeScale(i); })
        // .attr("x", function(d) { return x1(d.key); })
        .attr("y", function(d) { return yLinearScale1(d.value); })
        .attr("width", width/data.length*0.4)
        .attr("height", function(d) { return height - yLinearScale1(d.value); })
        .attr("fill", function(d) { return color(d.key); });

        var legvars = ['Attendance', 'W']

        var legend = chartGroup.append("g")
        .attr("font-family", "sans-serif")
        .attr("font-size", 10)
        .attr("text-anchor", "middle")
        .selectAll("g")
        .data(legvars.slice().reverse())
        .enter().append("g")
        .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

        legend.append("rect")
        .attr("x", width * 0.10)
        .attr("width", 15)
        .attr("height", 15)
        .attr("fill", color);

        legend.append("text")
        .attr("x", width*0.05)
        .attr("y", height*0.02)
        .attr("dy", "0.32em")
        .text(function(d) { return d; });

    })

}