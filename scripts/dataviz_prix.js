// append the svg object to the body of the page
var svg4 = d3.select("#dataviz_prix")
  .append("svg")
    .attr("width", "100%")
    .attr("height", "75vh")
    .style('background', 'white');

// Read data
d3.csv("https://docs.google.com/spreadsheets/d/e/2PACX-1vTh7DhT8bwqVSS7iIr7gtPIz_6hTureCgVC83tXuldshLGqyfPjy80YuqQbm3hcwdZhqltbh0woetV0/pub?gid=358640572&single=true&output=csv", function(data) {
  

  // Filter a bit the data -> more than 1 million inhabitants
  data = data.filter(function(d){ return d.value1>10 })
  

  // Color palette for continents?
  /*   var color = d3.scaleOrdinal()
    .domain(["Asia", "Europe", "Africa", "Oceania", "Americas"])
    .range(d3.schemeSet1); */
    
    /* function getTwo(v) {
      return v / 10 ** (Math.floor(Math.log10(Math.floor(v))) - 1);
  }
  
  console.log(getTwo(1115487.2644548)); */

  

 const formatCash = n => {
  if (n < 1e3) return n;
  if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + "K";
  if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + "M";
  if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + "B";
  if (n >= 1e12) return +(n / 1e12).toFixed(1) + "T";
 };
  /* var twoPlacedFloat = parseFloat(parseFloat('171.529').toFixed(2))

  console.log(twoPlacedFloat);

 var r =  parseFloat("12,45").toFixed(2)
 console.log(r); */

  // Size scale for countries
  var size = d3.scaleLinear()
    .domain([0, 2500000000000])  //[0, 1400000000]
    .range([4,170])  // circle will be between 7 and 55 px wide

  // create a tooltip
  var Tooltip = d3.select("#dataviz_prix")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "2px")
    .style("border-radius", "5px")
    .style("padding", "5px")

  // Three function that change the tooltip when user hover / move / leave a cell
  var mouseover = function(d) {
    Tooltip
      .style("opacity", 1)
  }
  var mousemove = function(d) {
    Tooltip
      .html('<u>' + d.pays + '</u>' + "<br>" + formatCash(d.value1) + " de $ d??pens??s en k??roz??ne")
      .style("left", (d3.mouse(this)[0]+20) + "px")
      .style("top", (d3.mouse(this)[1]) + "px")
  }
  var mouseleave = function(d) {
    Tooltip
      .style("opacity", 0)
  }

  // Initialize the circle: all located at the center of the svg area
  var node = svg4.append("g")
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
      .attr("class", "node")
      .attr("r", function(d){ return size(d.value1)})
      .attr("cx", width /2)
      .attr("cy", height /2)
      .style("fill", "#B4E2FF")
      .style("fill-opacity", 0.8)
      .attr("stroke", "black")
      .style("stroke-width", 1)
      .on("mouseover", mouseover) // What to do when hovered
      .on("mousemove", mousemove)
      .on("mouseleave", mouseleave)
      .call(d3.drag() // call specific function when circle is dragged
           .on("start", dragstarted)
           .on("drag", dragged)
           .on("end", dragended));

  
  // Features of the forces applied to the nodes:
  var simulation = d3.forceSimulation()
      .force("center", d3.forceCenter().x(width / 2).y(height / 2)) // Attraction to the center of the svg area
      .force("charge", d3.forceManyBody().strength(.1)) // Nodes are attracted one each other of value is > 0
      .force("collide", d3.forceCollide().strength(.4).radius(function(d){ return (size(d.value1)+3) }).iterations(1)) // Force that avoids circle overlapping
      
      .force("x", d3.forceX().strength(0.2).x( width/2 ))
      .force("y", d3.forceY().strength(0.2).y( height/2 ))

  // Apply these forces to the nodes and update their positions.
  // Once the force algorithm is happy with positions ('alpha' value is low enough), simulations will stop.
  simulation
      .nodes(data)
      .on("tick", function(d){
        node
            .attr("cx", function(d){ return d.x; })
            .attr("cy", function(d){ return d.y; })
            
            
      });


  // What happens when a circle is dragged?
  function dragstarted(d) {
    if (!d3.event.active) simulation.alphaTarget(.03).restart();
    d.fx = d.x;
    d.fy = d.y;
  }
  function dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  }
  function dragended(d) {
    if (!d3.event.active) simulation.alphaTarget(.03);
    d.fx = null;
    d.fy = null;
  }

})













// Read data
d3.csv("https://docs.google.com/spreadsheets/d/e/2PACX-1vQMWmLkbtS7dKxaRaImLccXdSZSZqWD3bsGhWrHExbCW_vsu-r52avOZqd-oFvJ61rzf_iFiWl4pCQv/pub?gid=1649841357&single=true&output=csv", function(data) {
  

  // Filter a bit the data -> more than 1 million inhabitants
  data = data.filter(function(d){ return d.value2>10 })
  

  // Color palette for continents?
  /*   var color = d3.scaleOrdinal()
    .domain(["Asia", "Europe", "Africa", "Oceania", "Americas"])
    .range(d3.schemeSet1); */
    
    /* function getTwo(v) {
      return v / 10 ** (Math.floor(Math.log10(Math.floor(v))) - 1);
  }
  
  console.log(getTwo(1115487.2644548)); */

  

 const formatCash = n => {
  if (n < 1e3) return n;
  if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + "K";
  if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + "M";
  if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + "B";
  if (n >= 1e12) return +(n / 1e12).toFixed(1) + "T";
 };
  /* var twoPlacedFloat = parseFloat(parseFloat('171.529').toFixed(2))

  console.log(twoPlacedFloat);

 var r =  parseFloat("12,45").toFixed(2)
 console.log(r); */

  // Size scale for countries
  var size = d3.scaleLinear()
    .domain([0, 2500000000000])  //[0, 1400000000]
    .range([4,330])  // circle will be between 7 and 55 px wide

  // create a tooltip
  var Tooltip = d3.select("#dataviz_prix")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "2px")
    .style("border-radius", "5px")
    .style("padding", "5px")

  // Three function that change the tooltip when user hover / move / leave a cell
  var mouseover = function(d) {
    Tooltip
      .style("opacity", 1)
  }
  var mousemove = function(d) {
    Tooltip
      .html('<u>' + d.pays + '</u>' + "<br>" + formatCash(d.value2) + " de $ d??pens??s en k??roz??ne")
      .style("left", (d3.mouse(this)[0]+20) + "px")
      .style("top", (d3.mouse(this)[1]) + "px")
  }
  var mouseleave = function(d) {
    Tooltip
      .style("opacity", 0)
  }

  // Initialize the circle: all located at the center of the svg area
  var node = svg4.append("g")
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
      .attr("class", "node")
      .attr("r", function(d){ return size(d.value2)})
      .attr("cx", width /1.01)
      .attr("cy", height /2)
      .style("fill", "#33A2E9")
      .style("fill-opacity", 0.8)
      .attr("stroke", "black")
      .style("stroke-width", 1)
      .on("mouseover", mouseover) // What to do when hovered
      .on("mousemove", mousemove)
      .on("mouseleave", mouseleave)
      .call(d3.drag() // call specific function when circle is dragged
           .on("start", dragstarted)
           .on("drag", dragged)
           .on("end", dragended));

  
  // Features of the forces applied to the nodes:
  var simulation = d3.forceSimulation()
      .force("center", d3.forceCenter().x(width /0.8).y(height / 2)) // Attraction to the center of the svg area
      .force("charge", d3.forceManyBody().strength(.1)) // Nodes are attracted one each other of value is > 0
      .force("collide", d3.forceCollide().strength(.4).radius(function(d){ return (size(d.value2)+3) }).iterations(1)) // Force that avoids circle overlapping
      
      .force("x", d3.forceX().strength(0.4).x( width/2 ))
      .force("y", d3.forceY().strength(0.4).y( height/2 ))

  // Apply these forces to the nodes and update their positions.
  // Once the force algorithm is happy with positions ('alpha' value is low enough), simulations will stop.
  simulation
      .nodes(data)
      .on("tick", function(d){
        node
            .attr("cx", function(d){ return d.x; })
            .attr("cy", function(d){ return d.y; })
            
            
      });


  // What happens when a circle is dragged?
  function dragstarted(d) {
    if (!d3.event.active) simulation.alphaTarget(.03).restart();
    d.fx = d.x;
    d.fy = d.y;
  }
  function dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  }
  function dragended(d) {
    if (!d3.event.active) simulation.alphaTarget(.03);
    d.fx = null;
    d.fy = null;
  }

})

