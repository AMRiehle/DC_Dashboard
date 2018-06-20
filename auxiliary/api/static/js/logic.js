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
        bottom: 80,
        left: 70
        };
    
    var width = svgWidth - margin.left - margin.right;
    var height = svgHeight - margin.top - margin.bottom;
    
    var svg = d3
        .select("#graph")
        .append("svg")
        .attr("width", svgWidth)
        .attr("height", svgHeight);

    // var chartGroup = svg.append("g")
    //     .attr("transform", `translate(${margin.left}, ${margin.top})`);

    var chosenY = 'W';
    var chosenX = 'capitals';
    var year = 'Year';
    var att = ['Attendance']
    var win = ['W']

    function yScale(alldata, chosenY) {
        var yLinearScale = d3.scaleLinear()
        .domain([d3.min(alldata, d => d[chosenY]), d3.max(alldata, d => d[chosenY])]).nice()
        .range([height, 0]);

        return yLinearScale;
    }

    function xScale(alldata, x) {
        var xTimeScale = d3.scaleTime()
        .domain(d3.extent(alldata, d => d[x])).nice()
        .range([0, width]);

        return xTimeScale;
    }

    function renderYAxis(newYScale, yAxis) {
        var leftAxis = d3.axisLeft(newYScale);
        yAxis.transition()
        .duration(1000)
        .call(leftAxis);
    
        return yAxis;
    }

    function renderXAxis(newXScale, xAxis) {
        var bottomAxis = d3.axisBottom(newXScale);
        xAxis.transition()
        .duration(1000)
        .call(bottomAxis);
    
        return bottomAxis;
    }

    function renderBarsY(barsGroup, newYScale) {

        barsGroup
        .transition()
        .duration(700)
        .attr("y", d => { return newYScale(d.value - d.value); })
        .attr("height", d => { return height - height })
        .transition()
        .duration(1500)
        .attr("y", d => { return newYScale(d.value); })
        .attr("height", d => { return height - newYScale(d.value); })

        return barsGroup;
    }

    function renderBarsY2(barsGroup, newYScale) {

        barsGroup
        .transition()
        .duration(1000)
        .attr("y", d => { return newYScale(d.value + d.value); })
        .attr("height", d => { return height - height })
        .transition()
        .duration(2600)
        .attr("y", d => { return newYScale(d.value); })
        .attr("height", d => { return height - newYScale(d.value); })

        return barsGroup;
    }

    d3.json('/sports', responce => {

        var parseTime = d3.timeParse("%Y")
        var data = responce[0];

        function changeTeam(data) {
            var chartGroup = d3.select('.chartG');
            chartGroup.remove();
            
            renderGraph(data);
        }
        
        changeTeam(data);
        
        // var chartGroup = svg.append("g")
        // .attr("transform", `translate(${margin.left}, ${margin.top})`);

        function renderGraph(data) {
            

            var chartGroup = svg.append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`)
            .attr('class', 'chartG')

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

        // var xTimeScale = xScale(data, year)
        var yLinearScale1 = yScale(data, chosenY);

        var yLinearScale2 = d3.scaleLinear()
        .domain([d3.min(data, d => d.Attendance), d3.max(data, d => d.Attendance)]).nice()
        .range([height, 0]);

        var color = d3.scaleOrdinal()
        .range(["#5DDEC9", "#EF64AD"]);

        var bottomAxis = d3.axisBottom(xTimeScale)
        .tickFormat(d3.timeFormat("%Y"));
        var leftAxis = d3.axisLeft(yLinearScale1);
        var rightAxis = d3.axisRight(yLinearScale2);

        var xAxis = chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis)
        .selectAll("text")	
        .style("text-anchor", "end")
        .attr("stroke", "red")
        .attr("transform", "rotate(-45)");

        var yAxis = chartGroup.append("g")
        .classed("leftAxis", true)
        .attr("stroke", "#EF64AD")
        .call(leftAxis);

        var y2Axis = chartGroup.append("g")
        .classed("rightAxis", true)
        .attr("transform", `translate(${width}, 0)`)
        .attr("stroke", "#5DDEC9")
        .call(rightAxis);

        //add Attendance bars
        chartGroup.append("g")
        .selectAll("g")
        .data(data)
        .enter().append("g")
        .attr("transform", function(d) { return "translate(" + xTimeScale(d.Year) + ",0)"; })
        .selectAll("rect")
        .data(function(d) { return att.map(function(key) { return {key: key, value: d[key]}; }); })
        .enter().append("rect")
        .attr("x", 5)
        .attr("y", function(d) { return yLinearScale2(d.value); })
        .attr("width", width/data.length*0.4)
        .attr("height", function(d) { return height - yLinearScale2(d.value); })
        .attr("fill", "#5DDEC9")
        .attr('class', 'bars');

        function renderPerf(data, chosenY) {

            var bars = d3.selectAll('.resultbars');
            bars.remove();

            chartGroup.append("g")
            .selectAll("g")
            .data(data)
            .enter()
            .append("g")
            .attr("transform", function(d) { return "translate(" + xTimeScale(d.Year) + ",0)"; })
            .selectAll("rect")
            .data(function(d) {
                if (chosenY === "W") {
                    win = ['W']; 
                    return win.map(function(key) { return {key: key, value: d[key]}; });
                }
                else if (chosenY === 'L') {
                    win = ['L'];
                    return win.map(function(key) { return {key: key, value: d[key]}; });
                }
            })
            .enter()
            .append("rect")
            .attr("y", function(d) { return yLinearScale1(d.value); })
            .attr("width", width/data.length*0.4)
            .attr("height", function(d) { return height - yLinearScale1(d.value); })
            .attr("fill", "#EF64AD")
            .attr('class', 'resultbars');
        
        }

        renderPerf(data, chosenY);

        // chartGroup.append("g")
        // .selectAll("g")
        // .data(data)
        // .enter()
        // .append("g")
        // .attr("transform", function(d) { return "translate(" + xTimeScale(d.Year) + ",0)"; })
        // .selectAll("rect")
        // .data(function(d) {
        //     if (chosenY === "W") {
        //         win = ['W']; 
        //         return win.map(function(key) { return {key: key, value: d[key]}; });
        //     }
        //     else if (chosenY === 'L') {
        //         win = ['L'];
        //         return win.map(function(key) { return {key: key, value: d[key]}; });
        //     }
        // })
        // .enter()
        // .append("rect")
        // .attr("y", function(d) { return yLinearScale1(d.value); })
        // .attr("width", width/data.length*0.4)
        // .attr("height", function(d) { return height - yLinearScale1(d.value); })
        // .attr("fill", function(d) { return color(d.key); })
        // .attr('class', 'resultbars');

        var resultBarsGroup = d3.selectAll('.resultbars');
        var attBarsGroup = d3.selectAll('.bars');

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

        var xlabelsGroup = chartGroup.append("g")
            .attr("transform", `translate(${width / 2}, ${height + 10})`);

        var xLabel1 = xlabelsGroup.append("text")
            .attr("x", 0)
            .attr("y", 35)
            .classed("active", true)
            .attr("value", "capitals")
            .text("Washington Capitals");

        var xLabel2 = xlabelsGroup.append("text")
            .attr("x", 0)
            .attr("y", 55)
            .classed("inactive", true)
            .attr("value", "nationals")
            .text("Washington Nationals");

        var ylabelsGroup = chartGroup.append("g")

        var yLabel1 = ylabelsGroup.append('text')
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left+20)
            .attr("x", 0 - (height / 2))
            .attr("dy", "1em")
            .attr("class", "active")
            .attr("value", "W")
            .text("Number of wins per season");
        
        var yLabel2 = ylabelsGroup.append('text')
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left+0)
            .attr("x", 0 - (height / 2))
            .attr("dy", "1em")
            .attr("class", "inactive")
            .attr("value", "L")
            .text("Number of losses per season");

        ylabelsGroup.selectAll("text")
            .on("click", function() {
            var value = d3.select(this).attr("value");

            if (value != chosenY) {
                chosenY = value;
                console.log(chosenY);

                if (chosenY === "W") {
                    
                    yLabel1
                    .classed("active", true)
                    .classed("inactive", false);
                    yLabel2
                    .classed("active", false)
                    .classed("inactive", true);
                }
                else {
                    
                    yLabel2
                    .classed("active", true)
                    .classed("inactive", false);
                    yLabel1
                    .classed("active", false)
                    .classed("inactive", true);
                }

                yLinearScale1 = yScale(data, chosenY);
                yAxis = renderYAxis(yLinearScale1, yAxis);
                renderPerf(data, chosenY);
                resultBarsGroup = renderBarsY(resultBarsGroup, yLinearScale1)
                attBarsGroup = renderBarsY2(attBarsGroup, yLinearScale2)
            }
        });

        xlabelsGroup.selectAll("text")
            .on("click", function() {
            
                var value = d3.select(this).attr("value");
                if (value != chosenX) {
                    chosenX = value;
                
                    if (chosenX === 'capitals') {
                        data = responce[0];
                    }
                    else if (chosenX === 'nationals') {
                        data = responce[1];
                    };

                    year = 'Year';
                    changeTeam(data);
                    console.log(chosenX);
                    // xTimeScale = xScale(data, year);
                    // xAxis = renderXAxis(xTimeScale, xAxis)
                }   
            
            })
        }

    })

}