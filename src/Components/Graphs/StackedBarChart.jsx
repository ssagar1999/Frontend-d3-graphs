import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const StackedBarChart = ({}) => {
  const svgRef = useRef();
  const containerRef = useRef();

  const data = [
    { label: 'New', value: 80, color: '#0396c5' },
    { label: 'Active', value: 10, color: 'rgb(106 238 238)' },
    { label: 'Closed', value: 5, color: 'rgb(126 130 131 / 94%)' },
    { label: 'Closed', value: 5, color: '#c9c8c6' }
  ];


  useEffect(() => {

    
    const containerWidth = containerRef.current.clientWidth;
    const containerHeight = containerRef.current.clientHeight;

    const svg = d3.select(svgRef.current)
      .attr('width', containerWidth)
      .attr('height', containerHeight);

    const total = d3.sum(data, d => d.value);

    function groupDataFunc(data) {
      const percent = d3.scaleLinear()
        .domain([0, total])
        .range([0, 100]);

      let cumulative = 0;
      const _data = data.map(d => {
        cumulative += d.value;
        return {
          value: d.value,
          cumulative: cumulative - d.value,
          label: d.label,
          percent: percent(d.value),
          color: d.color
        };
      }).filter(d => d.value > 0);
      return _data;
    };

    const groupData = groupDataFunc(data);

    const xScale = d3.scaleLinear()
      .domain([0, total])
      .range([0, containerWidth]);

    svg.selectAll('*').remove();

    const join = svg.selectAll('g')
      .data(groupData)
      .join('g')
      .attr('transform', `translate(0, ${containerHeight / 2})`);

    join.append('rect')
      .attr('class', 'rect-stacked')
      .attr('x', d => xScale(d.cumulative))
      .attr('y', -40)
      .attr('height', 30)
      .attr('width', d => (xScale(d.value) * containerWidth) / total) // Adjust width based on container width and total value
      .style('fill', d => d.color);

    // join.append('text')
    //   .attr('class', 'text-value')
    //   .attr('text-anchor', 'middle')
    //   .attr('x', d => xScale(d.cumulative) + ((xScale(d.value) * containerWidth) / (total * 2))) // Adjust x position based on container width and total value
    //   .attr('y', 0)
    //   .text(d => d.percent.toFixed(1) + ' %');

    // Append color rectangles and label texts for each category
    groupData.forEach((d, i) => {
      svg.append('rect')
        .attr('x', 5 + i * 120) // Adjust x position based on index
        .attr('y', containerHeight - 25)
        .attr('width', 15)
        .attr('height', 15)
        .style('fill', d.color);

      svg.append('text')
        .attr('x', 25 + i * 120) // Adjust x position based on index
        .attr('y', containerHeight - 14)
        .style('fill', 'black')
        .style('font-size', '12px') // Adjust font size
        .text(`${d.label} - ${d.value}`);
    });

  }, [data]);

  return <div ref={containerRef} style={{ width: '100%', height: '70px', overflow: 'visible' }}>
    <svg ref={svgRef} width="100%" height="100px"></svg>
  </div>;
};

export default StackedBarChart;