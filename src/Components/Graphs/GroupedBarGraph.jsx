import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const GroupedBarGraph = ({}) => {
  const svgRef = useRef();

  const data = [
    {
      category: 'A',
      value1: 30,
      value2: 40,
      value3: 20,
      value4: 50,
      value5: 10,
    },
    {
      category: 'B',
      value1: 50,
      value2: 20,
      value3: 10,
      value4: 40,
      value5: 30,
    },
    {
      category: 'C',
      value1: 20,
      value2: 60,
      value3: 40,
      value4: 30,
      value5: 50,
    },
    {
      category: 'D',
      value1: 40,
      value2: 10,
      value3: 30,
      value4: 20,
      value5: 60,
    },
    {
      category: 'E',
      value1: 60,
      value2: 30,
      value3: 50,
      value4: 10,
      value5: 40,
    },
  ];

  useEffect(() => {
    const margin = { top: 20, right: 30, bottom: 50, left: 40 }; // Increased bottom margin for legends
    const width = 500 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    const svg = d3
      .select(svgRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    const x0 = d3.scaleBand().domain(data.map((d) => d.category)).rangeRound([0, width]).paddingInner(0.1);

    const x1 = d3.scaleBand().domain(['value1', 'value2', 'value3', 'value4', 'value5']).rangeRound([0, x0.bandwidth()]).padding(0.05);

    const y = d3.scaleLinear().domain([0, d3.max(data, (d) => Math.max(d.value1, d.value2, d.value3, d.value4, d.value5))]).nice().range([height, 0]);

    const color = d3.scaleOrdinal().range(['#54F9AC', '#0F7E4C', '#00DCF4', '#0096D2', '#B000DF']);

    // Add reference lines
    svg
      .append('line')
      .attr('x1', 0)
      .attr('y1', y(25)) // Adjust the y-coordinate according to your reference line
      .attr('x2', width)
      .attr('y2', y(25)) // Adjust the y-coordinate according to your reference line
      .attr('stroke', 'red')
      .attr('stroke-width', 2)
      .attr('stroke-dasharray', '5,5');

    svg
      .append('line')
      .attr('x1', 0)
      .attr('y1', y(45)) // Adjust the y-coordinate according to your reference line
      .attr('x2', width)
      .attr('y2', y(45)) // Adjust the y-coordinate according to your reference line
      .attr('stroke', 'blue')
      .attr('stroke-width', 2)
      .attr('stroke-dasharray', '5,5');

    // Add background lines
    svg
      .append('g')
      .selectAll('line')
      .data(y.ticks())
      .join('line')
      .attr('x1', 0)
      .attr('x2', width)
      .attr('y1', (d) => y(d))
      .attr('y2', (d) => y(d))
      .attr('stroke', '#ddd');

    svg
      .append('g')
      .selectAll('g')
      .data(data)
      .join('g')
      .attr('transform', (d) => `translate(${x0(d.category)},0)`)
      .selectAll('rect')
      .data((d) => ['value1', 'value2', 'value3', 'value4', 'value5'].map((key) => ({ key, value: d[key] })))
      .join('rect')
      .attr('x', (d) => x1(d.key))
      .attr('y', (d) => y(d.value))
      .attr('width', x1.bandwidth())
      .attr('height', (d) => height - y(d.value))
      .attr('fill', (d) => color(d.key));

    // Legends
    const legend = svg.selectAll('.legend').data(['value1', 'value2', 'value3', 'value4', 'value5']).enter().append('g').attr('class', 'legend').attr('transform', (d, i) => `translate(${i * 80},${height + 20})`); // Adjust position

    legend.append('rect').attr('x', 0).attr('width', 15).attr('height', 24).style('fill', color);

    legend
      .append('text')
      .attr('x', 24)
      .attr('y', 9)
      .attr('dy', '.35em')
      .style('text-anchor', 'start')
      .text((d) => d);

    svg.append('g').call(d3.axisLeft(y));
  }, [data]);

  return <svg ref={svgRef}></svg>;
};

export default GroupedBarGraph;
