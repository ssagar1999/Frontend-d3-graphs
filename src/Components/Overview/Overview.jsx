import React from 'react'
import './Overview.css';
import DonutChart from '../Graphs/DonutChart';
import GroupedBarGraph from '../Graphs/GroupedBarGraph';
import LineGraph from '../Graphs/LineGraph';
import Histogram from '../Graphs/Histogram';
import GroupedBarChart from '../Graphs/GroupedBarChart';
import CustomChart from '../Graphs/CustomChart';
import StackedBarChart from '../Graphs/StackedBarChart';

const Overview = () => {
  return (
    <>
    <div className='container uflex'>
       <div className='toolbar uflex'>
        <button><i className="fas fa-sync"> </i> Refresh</button>
        <button><i className="far fa-clock"></i> Last 5 days <i className="fas fa-chevron-right"></i></button>
        </div>
    <hr className='uhr' />
    <div className='stats uflex'>
        <div className="stat"><i className="fas fa-chart-line"></i> 4.2K events</div>
        <div className="stat"><i className="fas fa-exclamation-triangle"></i> 93 alerts</div>
        <div className="stat"><i className="fas fa-exclamation-circle"></i> 98 incidents</div>
        <div className='schart'><h4>Incidents By status</h4><StackedBarChart/></div>
        </div>
    <hr className='uhr' />

    <div className='charts uflex'>
        <div className="section s1 uflex">
        <div className="chart uflex"><h2>Events and Alerts over time</h2><GroupedBarChart /><hr className='uhr' /></div>
        <div className="chart uflex"><h2>Data Source Anomalies</h2><LineGraph /><LineGraph /><hr className='uhr' /></div>
        <div className="chart uflex"><h2>Account Management</h2><Histogram /><hr className='uhr' /></div>
        </div>
        <hr className='uhr vr'/>
        <div className="section s2 uflex">
        <div className="chart uflex"><h2>Recent Incidents</h2><CustomChart /><hr className='uhr' /></div>
        <div className="chart uflex"><h2>Traffic Overview</h2><GroupedBarGraph /><hr className='uhr' /></div>

        <div className="chart uflex"><h2>Active Sources</h2><DonutChart /><hr className='uhr' /></div>
        <div className="chart uflex"><h2>Inactive Sources</h2><DonutChart /><hr className='uhr' /></div>
        </div>
    </div>

    </div>
    </>
  )
}

export default Overview;
