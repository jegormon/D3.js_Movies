const barData = [71, 67, 96, 84, 41];
const rectWidth = 50;
const petalPath =
  "M0, 0 C50,60 25,90 20,100 l -20 -20 M0,80 l -20 20 C-50,40 0,10 0,0";

async function fetchMoviesData() {
  try {
    const response = await fetch("./movies.json");
    const data = await response.json();
    return data;
  } catch (error) {
    // Handle any errors that occurred while loading the JSON data
  }
}

const moviesData = await fetchMoviesData();

// Wrap SVG element with d3
const svg = d3.select("#container");

// Select the first rect in the svg element
// {note: selections can be chained}
const select = svg.select("rect");

// Select all the paths in the svg selection
const selectAll = svg.selectAll("rect");

// This will link the array to the first rect
const dataToRect = svg.select("rect").datum(barData);

// The array will be assigned to each element
const dataToAllRect = svg.selectAll("rect").datum(barData);

// will assign each element in svg unique value from the array
svg
  .selectAll("rect")
  .data(barData)
  // Calculate the x-position based on its index
  .attr("x", (d, i) => i * rectWidth)
  // Place bar chard to the bottom (container height - x height)
  .attr("y", (d) => 100 - d)
  // Set height based on the bound datum
  .attr("height", (d) => d)
  // rest of attributes are const values
  .attr("width", rectWidth)
  .attr("stroke-width", 3)
  .attr("stroke", "purple")
  .attr("fill", "pink");

/** Flower section **/

const colors = {
  Action: "#ffc8f0",
  Comedy: "#cbf2bd",
  Animation: "#afe9ff",
  Drama: "#ffb09e",
  Other: "#fff2b4",
};

// Selecting SVG with flowers
const flowers = d3.select("#flowers");

const coloring = flowers
  .selectAll("path")
  .data(moviesData)
  .attr("fill", (d) => colors[d.genres[0]] || colors.Other)
  .attr("fill-opacity", 0.5)
  .attr("stroke-width", 2)
  .attr("stroke", (d) => colors[d.genres[0]] || colors.Other);

/** Dynamic elements **/
const dynamic = d3
  .select("#dynamic")
  .selectAll("rect")
  .data(barData)
  .enter()
  .append("rect")
  .attr("x", (d, i) => i * rectWidth)
  // set height based on the bound datum
  .attr("height", (d) => d)
  // rest of attributes are constant values
  .attr("width", rectWidth)
  .attr("stroke-width", 3)
  .attr("stroke", "plum")
  .attr("fill", "pink");
