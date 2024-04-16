import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const LineGraph = ({}) => {
    const svgRef = useRef();
  
    const data= [30, 40, 45, 50, 60, 55, 70, 30, 40, 45, 50, 60, 55, 70,55, 70, 30, 40, 45];
  const referenceValue = 50;

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
        .domain([0, data.length - 1])
        .range([0, width]);
  
      const y = d3.scaleLinear()
        .domain([0, d3.max(data)])
        .range([height, 0]);
  
      const line = d3.line()
        .x((d, i) => x(i))
        .y(d => y(d));
  
      // Reference line
      svg.append("line")
        .attr("x1", 0)
        .attr("y1", y(referenceValue))
        .attr("x2", width)
        .attr("y2", y(referenceValue))
        .attr("stroke", "black")
        .attr("stroke-width", 1)
        .attr("stroke-dasharray", "5,5"); // Dotted line
  
      svg.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "black")
        .attr("stroke-width", 1)
        .attr("d", line);

        

        svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x).tickSize(0));
  
      // Remove y-axis
      svg.selectAll(".y-axis").remove();
  
    }, [data, referenceValue]);
  
    return <svg ref={svgRef}></svg>;
  };
  



export default LineGraph;
