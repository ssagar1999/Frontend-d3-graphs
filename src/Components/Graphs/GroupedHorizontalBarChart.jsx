import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const GroupedHorizontalBarChart = ({}) => {
    const svgRef = useRef();

    const data = [
        {
          category: 'Dec',
          values: [
            { group: 'Group 1', value: 25 },
            { group: 'Group 2', value: 11 },
          ]
        },
        {
          category: 'mov',
          values: [
            { group: 'Group 1', value: 10 },
            { group: 'Group 2', value: 8 },
          ]
        },
        {
          category: 'Oct',
          values: [
            { group: 'Group 1', value: 25 },
            { group: 'Group 2', value: 11 },
          ]
        },
        {
            category: 'Sep',
            values: [
              { group: 'Group 1', value: 18 },
              { group: 'Group 2', value: 8 },
            ]
          },
          {
            category: 'Aug',
            values: [
              { group: 'Group 1', value: 15 },
              { group: 'Group 2', value: 22 },
            ]
          }
      ];
  
    useEffect(() => {
      const margin = { top: 40, right: 30, bottom: 30, left: 80 };
      const width = 600 - margin.left - margin.right;
      const height = 400 - margin.top - margin.bottom;
  
      const svg = d3.select(svgRef.current)
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);
  
      const categories = data.map(d => d.category);
      const groups = data[0].values.map(d => d.group);
  
      const y0 = d3.scaleBand()
        .domain(categories)
        .rangeRound([0, height])
        .paddingInner(0.1);
  
      const y1 = d3.scaleBand()
        .domain(groups)
        .rangeRound([0, y0.bandwidth()])
        .padding(0.05);
  
      const x = d3.scaleLinear()
        .domain([0, d3.max(data, d => d3.max(d.values, d => d.value))])
        .nice()
        .rangeRound([0, width]);
  
      const color = d3.scaleOrdinal()
        .domain(groups)
        .range(d3.schemeCategory10);

        // Append vertical background grid lines
      svg.selectAll(".verticalGrid")
      .data(x.ticks())
      .enter().append("line")
      .attr("class", "verticalGrid")
      .attr("x1", d => x(d))
      .attr("y1", 0)
      .attr("x2", d => x(d))
      .attr("y2", height)
      .attr("stroke", "#ddd")
    //   .attr("stroke-dasharray", "2,2");
  
      svg.append("g")
        .selectAll("g")
        .data(data)
        .enter().append("g")
        .attr("transform", d => `translate(0,${y0(d.category)})`)
        .selectAll("rect")
        .data(d => d.values)
        .enter().append("rect")
        .attr("x", 0)
        .attr("y", d => y1(d.group))
        .attr("width", d => x(d.value))
        .attr("height", y1.bandwidth())
        .attr("fill", d => color(d.group));

        
  
      svg.append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x).ticks(5));
  
      svg.append("g")
        .attr("class", "y-axis")
        .call(d3.axisLeft(y0));

      // Add group names on top of the graph
      svg.append("g")
        .selectAll(".group-name")
        .data(groups)
        .enter().append("text")
        .attr("class", "group-name")
        .attr("x", 0)
        .attr("y", (d, i) => i * 20)
        .attr("dx", -30)
        .attr("dy", "0.32em")
        .attr("text-anchor", "end")
        .style("font-size", "12px")
        .style("fill", d => color(d))
        .text(d => d);
  
    }, [data]);
  
    return <svg ref={svgRef}></svg>;
  };

export default GroupedHorizontalBarChart;
