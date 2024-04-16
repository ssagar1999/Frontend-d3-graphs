import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const LineChart2 = () => {
  const svgRef = useRef();

  // Sample data
  const data = [
    { date: '01/01/2022', incidents: 120 },
    { date: '02/01/2022', incidents: 60 },
    { date: '04/01/2022', incidents: 20 },
    { date: '05/01/2022', incidents: 30 },
    { date: '06/01/2022', incidents: 10 },
  ];

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    // Define margins and dimensions
    const margin = { top: 20, right: 20, bottom: 30, left: 60 }; // Increased bottom margin for labels
    const width = +svg.attr('width') - margin.left - margin.right;
    const height = +svg.attr('height') - margin.top - margin.bottom;
    
       // Filter data to exclude dates with zero incidents
       const filteredData = data.filter(d => d.incidents !== 0);

       // Parse dates
       const parseDate = d3.timeParse('%d/%m/%Y');
       filteredData.forEach(d => {
         d.date = parseDate(d.date);
       });
   
       // Create scales
       const xScale = d3.scaleTime().domain(d3.extent(filteredData, d => d.date)).range([margin.left, width - margin.right]);
       const yScale = d3.scaleLinear().domain([0, d3.max(filteredData, d => d.incidents)]).range([height - margin.bottom, margin.top]);

    // Line generator
    const line = d3.line()
      .x(d => xScale(d.date))
      .y(d => yScale(d.incidents));

    // Append background grid lines
    svg.selectAll('.grid-line')
      .data(yScale.ticks())
      .enter().append('line')
      .attr('class', 'grid-line')
      .attr('x1', margin.left)
      .attr('y1', d => yScale(d))
      .attr('x2', width - margin.right)
      .attr('y2', d => yScale(d))
      .attr('stroke', '#ddd')
      .attr('stroke-dasharray', '2,2');

    // Append line
    svg.append('path')
      .datum(filteredData)
      .attr('fill', 'none')
      .attr('stroke', 'red')
      .attr('stroke-width', 1.5)
      .attr('d', line);

    // Append circles
    // svg.selectAll('circle')
    //   .data(filteredData)
    //   .enter().append('circle')
    //   .attr('cx', d => xScale(d.date))
    //   .attr('cy', d => yScale(d.incidents))
    //   .attr('r', 3)
    //   .attr('fill', 'red');

    // Append x axis
    svg.append('g')
      .attr('transform', `translate(0, ${height - margin.bottom})`)
      .call(d3.axisBottom(xScale).tickValues(filteredData.map(d => d.date)));

    // Append x axis label
    svg.append('text')
    .attr('transform', `translate(${width / 2}, ${height + margin.top - 0})`) // Adjust position
    .style('text-anchor', 'middle')
    .text('Vulnerable mean time to remidiate');

    // Append y axis
    svg.append('g')
      .attr('transform', `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(yScale));

    // Append y axis label
    // svg.append('text')
    //   .attr('transform', 'rotate(-90)')
    //   .attr('y', margin.left / 5) // Adjust positio
    //   .attr('x', 0 - height / 2) // Adjust position
    //   .attr('dy', '1em')
    //   .style('text-anchor', 'middle')
    //   .text('Number of Incidences');
  }, []);

  return (
    <svg ref={svgRef} width={600} height={300}></svg>
  );
};

export default LineChart2;
