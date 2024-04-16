import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const MultiLineChart = () => {
  const svgRef = useRef();

  // Dummy data
  const dummyData = [
    { date: '01/01/2022', volume1: 100, volume2: 80, volume3: 120 },
    { date: '02/01/2022', volume1: 150, volume2: 90, volume3: 110 },
    { date: '03/01/2022', volume1: 120, volume2: 100, volume3: 130 },
    { date: '04/01/2022', volume1: 180, volume2: 110, volume3: 140 },
    { date: '05/01/2022', volume1: 200, volume2: 120, volume3: 150 },
    { date: '06/01/2022', volume1: 250, volume2: 130, volume3: 160 },
    { date: '07/01/2022', volume1: 220, volume2: 140, volume3: 170 },
    { date: '08/01/2022', volume1: 300, volume2: 150, volume3: 180 },
  ];

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    const margin = { top: 20, right: 20, bottom: 40, left: 40 }; // Increased bottom margin for legend
    const width = 1100 - margin.left - margin.right;
    const height = 350 - margin.top - margin.bottom;

    const x = d3.scaleTime()
      .range([0, width]);

    const y = d3.scaleLinear()
      .range([height, 0]);

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const line = d3.line()
      .x(d => x(d.date))
      .y(d => y(d.value));

    const data = Object.keys(dummyData[0]).filter(key => key !== 'date').map(key => ({
      name: key,
      values: dummyData.map(d => ({ date: new Date(d.date), value: d[key] }))
    }));

    x.domain(d3.extent(dummyData, d => new Date(d.date)));

    y.domain([
      d3.min(data, c => d3.min(c.values, d => d.value)),
      d3.max(data, c => d3.max(c.values, d => d.value))
    ]);

    // Append background grid lines
    svg.append("g")
      .attr("class", "grid")
      .attr("transform", `translate(${margin.left}, ${margin.top})`)
      .selectAll("line.horizontalGrid")
      .data(y.ticks().slice(1))
      .enter()
      .append("line")
      .attr("class", "horizontalGrid")
      .attr("x1", 0)
      .attr("x2", width)
      .attr("y1", d => y(d))
      .attr("y2", d => y(d))
      .attr("stroke", "#ccc");

    svg.append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`)
      .selectAll("path")
      .data(data)
      .join("path")
      .attr("fill", "none")
      .attr("stroke", d => color(d.name)) // Match line color with legend
      .attr("stroke-width", 2)
      .attr("d", d => line(d.values));

    svg.append("g")
      .attr("transform", `translate(${margin.left}, ${height + margin.top})`)
      .call(d3.axisBottom(x));

    svg.append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`)
      .call(d3.axisLeft(y));

    // Add legend
    const legend = svg.append("g")
      .attr("transform", `translate(${margin.left + 100}, ${height + margin.top + 60})`);

    const legendItems = data.map(d => d.name);

    legend.selectAll("rect")
      .data(legendItems)
      .enter().append("rect")
      .attr("x", (d, i) => i * 120)
      .attr("width", 15)
      .attr("height", 3)
      .attr("fill", (d, i) => color(d)); // Match legend color with line

    legend.selectAll("text")
      .data(legendItems)
      .enter().append("text")
      .attr("x", (d, i) => i * 120 + 20)
      .attr("y", 4)
      .text(d => d)
      .attr("font-size", "12px");
  }, []);

  return (
    <svg ref={svgRef} width="1100" height="400">
      <g />
    </svg>
  );
};

export default MultiLineChart;
