// append the svg object to the body of the page
var svg3 = d3.select("#dataviz_litre")
  .append("svg")
    .attr("width", "100%")
    .attr("height", "57vh")
    .style('background', '#f9f9f9');

// Read data
d3.csv("https://docs.google.com/spreadsheets/d/e/2PACX-1vRjBaMNtXZzyGg7mKLy8G-kxVxheciU_UnvH_bl46_jVATEpVIuJfThVB0K7YRXjekkJtn7tc22Fz6d/pub?gid=612539542&single=true&output=csv", function(data) {
  

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
    .domain([0, 550000000])  //[0, 1400000000]
    .range([3,250])  // circle will be between 7 and 55 px wide

  // create a tooltip
  var Tooltip = d3.select("#dataviz_litre")
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
      .html('<u>' + d.pays + '</u>' + "<br>" + formatCash((d.value1)/159) + " of barrels consumed")
      .style("left", (d3.mouse(this)[0]+20) + "px")
      .style("top", (d3.mouse(this)[1]) + "px")
  }
  var mouseleave = function(d) {
    Tooltip
      .style("opacity", 0)
  }

  // Initialize the circle: all located at the center of the svg area
  var node = svg3.append("g")
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
      .attr("class", "node")
      .attr("r", function(d){ return size((d.value1)/159)})
      .attr("cx", width /4)
      .attr("cy", height /4)
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
      .force("center", d3.forceCenter().x(width / 2.2).y(height / 2)) // Attraction to the center of the svg area
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
d3.csv("https://docs.google.com/spreadsheets/d/e/2PACX-1vRuoAJ9CuMC-zqLZB8MSZYfzR7-BkrWZqqXi9B7Lk1OXLDXTED-q1HpG_kYWbPpUFwjeZnL2f_9vjOn/pub?gid=67638432&single=true&output=csv", function(data) {
  

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
    .domain([0, 400000000])  //[0, 1400000000]
    .range([3,250])  // circle will be between 7 and 55 px wide

  // create a tooltip
  var Tooltip = d3.select("#dataviz_litre")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "2px")
    .style("border-radius", "5px")
    .style("padding", "5px")
    .style("text-align", "center")

  // Three function that change the tooltip when user hover / move / leave a cell
  var mouseover = function(d) {
    Tooltip
      .style("opacity", 1)
  }
  var mousemove = function(d) {
    Tooltip
      .html('<u>' + d.pays + '</u>' + "<br>" + formatCash((d.value2)/159) + " of barrels consumed")
      .style("left", (d3.mouse(this)[0]+20) + "px")
      .style("top", (d3.mouse(this)[1]) + "px")
  }
  var mouseleave = function(d) {
    Tooltip
      .style("opacity", 0)
  }

  // Initialize the circle: all located at the center of the svg area
  var node = svg3.append("g")
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
      .attr("class", "node")
      .attr("r", function(d){ return size((d.value2)/159)})
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
      .force("center", d3.forceCenter().x(width /0.7119).y(height / 2)) // Attraction to the center of the svg area
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

