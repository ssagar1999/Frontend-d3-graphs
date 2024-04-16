import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const GroupedBarChart = ({ }) => {
  const svgRef = useRef();
  const data = [
    { category: "Dec 10", value1: 130, value2: 40 },
    { category: "Dec 17", value1: 150, value2: 20 },
    { category: "Dec 24", value1: 120, value2: 60 },
    { category: "Dec 31", value1: 140, value2: 10 },
    { category: "Dec 7", value1: 160, value2: 30 },
    { category: "Dec 14", value1: 160, value2: 30 },

  ];

  useEffect(() => {
    const margin = { top: 20, right: 60, bottom: 30, left: 40 }; // Increased right margin for the additional axis
    const width = 500 - margin.left - margin.right;
    const height = 250 - margin.top - margin.bottom;

    const svg = d3.select(svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    const xScale = d3.scaleBand()
      .domain(data.map(d => d.category))
      .range([0, width])
      .padding(0.2);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => Math.max(d.value1, d.value2))])
      .nice()
      .range([height, 0]);

    svg.selectAll(".bar1")
      .data(data)
      .enter().append("rect")
      .attr("class", "bar1")
      .attr("x", d => xScale(d.category))
      .attr("y", d => yScale(d.value1))
      .attr("width", xScale.bandwidth() / 2)
      .attr("height", d => height - yScale(d.value1))
      .attr("fill", "#3CFFBB");

    svg.selectAll(".bar2")
      .data(data)
      .enter().append("rect")
      .attr("class", "bar2")
      .attr("x", d => xScale(d.category) + xScale.bandwidth() / 2)
      .attr("y", d => yScale(d.value2))
      .attr("width", xScale.bandwidth() / 2)
      .attr("height", d => height - yScale(d.value2))
      .attr("fill", "#006048");

    svg.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(xScale));

    // Appending left y-axis
    svg.append("g")
      .call(d3.axisLeft(yScale));

    // Appending right y-axis
    svg.append("g")
      .attr("transform", `translate(${width}, 0)`) // Move the axis to the right side
      .call(d3.axisRight(yScale));

  }, [data]);

  return <svg ref={svgRef}></svg>;
};

export default GroupedBarChart;
