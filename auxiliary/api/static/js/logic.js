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
        var data = responce[0];

        data.forEach(el => {
            el.Year = parseTime(el.Year);
            el.W = +el.W;
            el.Attendance = +el.Attendance;
            el.L = +el.L;
        });

        console.log(data)

        var xTimeScale = d3.scaleTime()
        .domain(d3.extent(data, d => d.Year))
        .range([0, width]);

        var yLinearScale1 = d3.scaleLinear()
        .domain([d3.min(data, d => d.W), d3.max(data, d => d.W)]).nice()
        .range([height, 0]);

        var yLinearScale2 = d3.scaleLinear()
        .domain([d3.min(data, d => d.Attendance), d3.max(data, d => d.Attendance)]).nice()
        .range([height, 0]);

        var bottomAxis = d3.axisBottom(xTimeScale)
        .tickFormat(d3.timeFormat("%Y"));
        var leftAxis = d3.axisLeft(yLinearScale1);
        var rightAxis = d3.axisRight(yLinearScale2);

        chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);

        chartGroup.append("g")
        // Define the color of the axis text
        .classed("leftAxis", true)
        .call(leftAxis);

        chartGroup.append("g")
        // Define the color of the axis text
        .classed("rightAxis", true)
        .attr("transform", `translate(${width}, 0)`)
        .call(rightAxis);

        


    })

}