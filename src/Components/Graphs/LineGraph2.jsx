import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const LineGraph = () => {
  const svgRef = useRef();

  const dummyData = [
    { date: '01/01/2022', volume: 100 },
    { date: '02/01/2022', volume: 150 },
    { date: '03/01/2022', volume: 0 }, // Example with zero volume
    { date: '04/01/2022', volume: 180 },
    { date: '05/01/2022', volume: 0 }, // Example with zero volume
    { date: '06/01/2022', volume: 250 },
    { date: '07/01/2022', volume: 0 }, // Example with zero volume
    { date: '08/01/2022', volume: 300 },
  ];

  const width = 600;
  const height = 400;

  useEffect(() => {
    const filteredData = dummyData.filter(d => d.volume > 0);

    const svg = d3.select(svgRef.current);

    // Define margins and dimensions
    const margin = { top: 20, right: 20, bottom: 50, left: 40 }; // Increased bottom margin for x-axis labels
    const graphWidth = width - margin.left - margin.right;
    const graphHeight = height - margin.top - margin.bottom;

    // Parse dates
    const parseDate = d3.timeParse('%d/%m/%Y');
    filteredData.forEach(d => {
      d.date = parseDate(d.date);
    });

    // Create scales
    const xScale = d3.scaleTime()
      .domain(d3.extent(filteredData, d => d.date))
      .range([margin.left, graphWidth]);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(filteredData, d => d.volume)])
      .nice()
      .range([graphHeight, margin.top]);

      
// Add reference line
svg.append("line")
  .attr("x1", margin.left)
  .attr("y1", yScale(200)) // Adjust the y-coordinate according to your reference line
  .attr("x2", width - margin.right)
  .attr("y2", yScale(200)) // Adjust the y-coordinate according to your reference line
  .attr("stroke", "red")
  .attr("stroke-width", 2)
  .attr("stroke-dasharray", "5,5");

    // Append background grid lines
    svg.selectAll(".grid-line")
      .data(yScale.ticks())
      .enter().append("line")
      .attr("class", "grid-line")
      .attr("x1", margin.left)
      .attr("y1", d => yScale(d))
      .attr("x2", width - margin.right)
      .attr("y2", d => yScale(d))
      .attr("stroke", "#ddd");

    // Create line generator
    const line = d3.line()
      .x(d => xScale(d.date))
      .y(d => yScale(d.volume));

    // Append line
    svg.append("path")
      .datum(filteredData)
      .attr("fill", "none")
      .attr("stroke", "black")
      .attr("stroke-width", 2)
      .attr("d", line);

    // Append x axis
    svg.append("g")
      .attr("transform", `translate(0, ${graphHeight})`)
      .call(d3.axisBottom(xScale).tickValues(filteredData.map(d => d.date)))
      .selectAll("text")
      .attr("x", 0)
      .attr("y", 9)
      .style("text-anchor", "middle")
      .style("font-size", "12px");

    // Append y axis
    svg.append("g")
      .attr("transform", `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(yScale));
  }, []);

  return <svg ref={svgRef} width={width} height={height}></svg>;
};

export default LineGraph;
