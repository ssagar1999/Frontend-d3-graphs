import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const SingleRowBarGraph = ({ }) => {
  const svgRef = useRef();
    const data = [410, 80, 60, 40, 20];

  useEffect(() => {
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const width = 600 - margin.left - margin.right;
    const height = 100 - margin.top - margin.bottom;

    const svg = d3.select(svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3.scaleLinear()
      .domain([0, d3.max(data)])
      .range([0, width]);

    const y = d3.scaleBand()
      .domain(data.map((d, i) => i))
      .range([0, height])
      .padding(0.1);

    svg.selectAll(".bar")
      .data(data)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", 0)
      .attr("y", (d, i) => y(i))
      .attr("width", x)
      .attr("height", y.bandwidth())
      .attr("fill", "steelblue");

    svg.selectAll(".bar-label")
      .data(data)
      .enter().append("text")
      .attr("class", "bar-label")
      .attr("x", d => x(d) + 5)
      .attr("y", (d, i) => y(i) + y.bandwidth() / 2)
      .attr("dy", "0.35em")
      .text(d => d);

  }, [data]);

  return <svg ref={svgRef}></svg>;
};


export default SingleRowBarGraph;
