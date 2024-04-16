import React from 'react'
import DonutChart from '../Graphs/DonutChart';
import GroupedBarGraph from '../Graphs/GroupedBarGraph';
import LineGraph from '../Graphs/LineGraph';
import Histogram from '../Graphs/Histogram';
import GroupedBarChart from '../Graphs/GroupedBarChart';
import DonutChart2 from '../Graphs/DonutChart2';
import LineChart from '../Graphs/LineChart';
import './SIEM.css'
import LineChart2 from '../Graphs/LineChart2';
import SingleRowBarGraph from '../Graphs/SingleRowBarGraph';
import SimpleBarGraph from '../Graphs/SimpleBarGraph';
import LineGraph2 from '../Graphs/LineGraph2';
import MultiLineChart from '../Graphs/MulitLineChart';
import GroupedHorizontalBarChart from '../Graphs/GroupedHorizontalBarChart';

const SIEM = () => {
  return (
    <div>
        <>
    <div className='container uflex'>
       <div className='toolbar uflex'>
        <button><i className="fas fa-sync"> </i> Refresh</button>
        <button><i className="far fa-clock"></i> Last 5 days <i className="fas fa-chevron-right"></i></button>
        </div>
    <hr className='uhr' />

    <div className='charts uflex'>
    <div className="section s1 uflex">
        <div className="chart uflex"><h2>Policy Compliance</h2><DonutChart2 /><hr className='uhr' /></div>
        <div className="chart uflex"><h2>Configuration Compliane</h2><DonutChart2 /><hr className='uhr' /></div>
        <div className="chart uflex">
          <div className="chart-heading"> <i className="far fa-clock"> </i><button> Last month <i className="fas fa-chevron-down"></i></button><h4>Number of Incidence in Timeline</h4></div>
        <LineChart /><hr className='uhr' /></div>
        </div>
        <hr className='uhr vr'/>
        <div className="section s2 uflex">
        <div className="chart uflex"><h2>Vulnerability Response - Avg time to close</h2><LineChart2 /><hr className='uhr' /></div>
        <div className="chart uflex"><h2>Active Sources</h2><SimpleBarGraph /><hr className='uhr' /></div>
        <div className="chart uflex">
          <div className="chart-heading"> <i className="far fa-clock"> </i><button> Last month <i className="fas fa-chevron-down"></i></button><h4>Network Traffic Volume</h4></div>
        <LineGraph2 /><hr className='uhr' />
        </div>
        </div>
        
    </div>
    
    <div className="chart uflex"><MultiLineChart/><hr className='uhr' /></div>
    <div className="charts uflex">
      <div className="section s1 uflex">
      <div className="chart uflex  minichart ">
      <h2>Monthly Scan coverage</h2>
      <p>December 2022</p>
      <h1>94.5%</h1>
      <p><span><i className="fas fa-arrow-down"></i> 12.2 (18.07%)</span> November 27 (6.8)</p>

      </div><hr className='uhr' />
      <div className="chart uflex minichart">
      <h2>Monthly Remediation Efficiency</h2>
      <p>December 2022</p>
      <h1>137.5%</h1>
      <p><span><i className="fas fa-arrow-up"></i> 48.2 (57.2%)</span> November 27 (85%)</p>

        </div>
        <hr className='uhr' />
      </div>
      <hr className='uhr vr2' />
      <div className="section s2 uflex">
      <div className="chart uflex">
      <div className="chart-heading ch">
         <h4>Network Traffic Volume</h4>
       <button>Last 5 months <i className="fas fa-chevron-down"></i></button><button>Year - 2022 <i className="fas fa-chevron-down"></i></button></div>
        <GroupedHorizontalBarChart />
      </div>

      </div>
    </div>
    </div>
    </>
    </div>
  )
}

export default SIEM
