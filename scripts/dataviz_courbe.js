// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 30, left: 220},
    width2 = 1100 - margin.left - margin.right,
    height2 = 300 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg7 = d3.select("#dataviz_courbe")
  .append("svg")
    .attr("width", width2 + margin.left + margin.right)
    .attr("height", height2 + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

//Read the data
d3.csv("https://docs.google.com/spreadsheets/d/e/2PACX-1vSqvr7-BCnRzhxbHdblrO_Sdr8_GbzmoHMy6BxsA1iDXAOJpjeYnUA76w14aL720hi63da7Ted0IhB4/pub?gid=502714986&single=true&output=csv", function(data) {

  // group the data: I want to draw one line per group
  var sumstat = d3.nest() // nest function allows to group the calculation per level of a factor
    .key(function(d) { return d.name;})
    .entries(data);

  // Add X axis --> it is a date format
  
  
  var x = d3.scaleLinear()
    .domain(d3.extent(data, function(d) { return d.year; }))
    .range([ 0, width2 ]);
  svg7.append("g")
    .attr("transform", "translate(0," + height2 + ")")
    .call(d3.axisBottom(x).ticks(16,",f"));

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([0, d3.max(data, function(d) { return +d.n; })])
    .range([ height2, 0 ]);
  svg7.append("g")
    .call(d3.axisLeft(y));

  // color palette
  var res = sumstat.map(function(d){ return d.key }) // list of group names
  var color = d3.scaleOrdinal()
    .domain(res)
    .range(['#33A2E9','#B4E2FF','#4daf4a','#984ea3','#ff7f00','#ffff33','#a65628','#f781bf','#999999'])

  // Draw the line
  svg7.selectAll(".line")
      .data(sumstat)
      .enter()
      .append("path")
      
        .attr("fill", "none")
        .attr("stroke", function(d){ return color(d.key) })
        .attr("stroke-width", 3)
        .transition()
      .duration(10000)
        .attr("d", function(d){
          return d3.line()
            .x(function(d) { return x(d.year); })
            .y(function(d) { return y(+d.n); })
            (d.values)
        })
        

})

