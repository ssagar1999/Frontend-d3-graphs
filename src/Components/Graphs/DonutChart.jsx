import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const DonutChart = ({}) => {
  const svgRef = useRef();

  const data = [
    { label: 'CAS', value: 10 },
    { label: 'Telecom', value: 20 },
    { label: 'Fortigate', value: 30 },
    { label: 'McAfee', value: 40 },
    { label: 'Microsoft', value: 50 },
    { label: 'AuditD', value: 60 },
  ];

  useEffect(() => {
    const width = 300;
    const height = 200;
    const radius = Math.min(width, height) / 2;

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    const color = d3.scaleOrdinal().domain(data.map((d) => d.label)).range(d3.schemeCategory10);

    const pie = d3.pie().value((d) => d.value).sort(null);

    const arc = d3.arc().innerRadius(radius * 0.6).outerRadius(radius * 0.8);

    const arcs = pie(data);

    svg
      .selectAll('path')
      .data(arcs)
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', (d) => color(d.data.label))
      .attr('stroke', 'white')
      .style('stroke-width', '2px');
  }, [data]);

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg ref={svgRef}></svg>
      <Legend data={data} />
    </div>
  );
};

const Legend = ({ data }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginLeft: '20px' }}>
      {data.map((item, index) => (
        <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
          <div style={{ width: '10px', height: '10px', backgroundColor: d3.schemeCategory10[index], marginRight: '5px' }}></div>
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
};

export default DonutChart;
