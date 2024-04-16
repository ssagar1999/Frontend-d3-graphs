import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const Histogram = ({}) => {
  const svgRef = useRef();
  const data = [
    { category: "Requests", value: 2500 },
    { category: "Online", value: 1800 },
    { category: "Delete", value: 1400 },
    { category: "Change", value: 800 },
    { category: "Unlock", value: 400 },
    { category: "Disable", value: 200 }
  ];

  useEffect(() => {
    const margin = { top: 50, right: 50, bottom: 50, left: 250 };
    const width = 600 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    const svg = d3.select(svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3.scaleBand()
      .domain(data.map(d => d.category))
      .range([0, width])
      .padding(0);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value)])
      .nice()
      .range([height, 0]);

    const xAxis = d3.axisBottom(x);

    const yAxis = d3.axisLeft(y);

    svg.append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0,${height})`)
      // .call(xAxis);

    svg.append("g")
      .attr("class", "y-axis")
      .call(yAxis);

    svg.selectAll(".bar")
      .data(data)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", d => x(d.category))
      .attr("y", d => y(d.value))
      .attr("width", x.bandwidth())
      .attr("height", d => height - y(d.value))
      .attr("fill", (d, i) => d3.schemeCategory10[i]);

    // Adding legends
    const legend = svg.selectAll(".legend")
      .data(data)
      .enter().append("g")
      .attr("class", "legend")
      .attr("transform", (d, i) => `translate(${margin.left - 450},${i * 35})`);

    legend.append("rect")
      .attr("x", 0)
      .attr("width", 20)
      .attr("height", 20)
      .style("fill", (d, i) => d3.schemeCategory10[i]);

    legend.append("text")
      .attr("x", 30)
      .attr("y", 10)
      .attr("dy", ".15em")
      .style("text-anchor", "start")
      .text(d => `${d.category} - ${d.value}`);

  }, [data]);

  return (
    <svg ref={svgRef}></svg>
  );
};

export default Histogram;
