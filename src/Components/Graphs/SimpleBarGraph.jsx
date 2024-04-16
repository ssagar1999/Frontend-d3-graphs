import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const SimpleBarGraph = ({ }) => {
  const svgRef = useRef();

  const data = [
    { label: 'Operational', value: 480 },
    { label: 'Legal', value: 90 },
    { label: 'IT', value: 70 },
    { label: 'Financial', value: 50 },
    { label: 'Reputational', value: 30 },
    { label: 'Credit', value: 20 },
    { label: 'Market', value: 10 },
  ];
  const width = 600;
  const height = 300;

  useEffect(() => {
    if (!data || data.length === 0) return;

    const svg = d3.select(svgRef.current);

    // Define margins and dimensions
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const graphWidth = width - margin.left - margin.right;
    const graphHeight = height - margin.top - margin.bottom;

    // Create scales
    const xScale = d3.scaleBand()
      .domain(data.map(d => d.label))
      .range([margin.left, graphWidth])
      .padding(0.2);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value)])
      .nice()
      .range([graphHeight, margin.top]);

      svg.selectAll(".grid-line")
      .data(yScale.ticks())
      .enter().append("line")
      .attr("class", "grid-line")
      .attr("x1", margin.left)
      .attr("y1", d => yScale(d))
      .attr("x2", width - margin.right)
      .attr("y2", d => yScale(d))
      .attr("stroke", "#ddd")
    //   .attr("stroke-dasharray", "2,2");

    // Create bars
    svg.selectAll(".bar")
      .data(data)
      .enter().append("rect")
        .attr("class", "bar")
        .attr("x", d => xScale(d.label)) // Adjusted x position for bars
        .attr("y", d => yScale(d.value))
        .attr("width", xScale.bandwidth() / 2)
        .attr("height", d => graphHeight - yScale(d.value))
        .attr("fill", "#A2FEE9");

    // Append x axis
    svg.append("g")
      .attr("transform", `translate(0, ${graphHeight})`)
      .call(d3.axisBottom(xScale).tickSize(0))
      .selectAll("text")
      .attr("x", xScale.bandwidth() -70) // Centering x-axis labels with bars
      .attr("y", 9)
      .style("text-anchor", "middle")
      .style("font-size", "12px");

    // Append y axis
    svg.append("g")
      .attr("transform", `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(yScale));
  }, [data, width, height]);

  return <svg ref={svgRef} width={width} height={height}></svg>;
};

export default SimpleBarGraph;
