import React, { useState } from 'react'
import './Sidebar.css'
import { Link, Route, Routes } from 'react-router-dom';
import Overview from '../Overview/Overview';

const Sidebar = () => {
    const [isGeneralOpen, setIsGeneralOpen] = useState(false);
    const [isUSM, setIsUSMOpen] = useState(false);
    const [isSetting, setIsSettingOpen] = useState(false);

    const toggleGeneral = () => {
        setIsGeneralOpen(!isGeneralOpen);
      };
      const toggleUSM = () => {
        setIsUSMOpen(!isUSM);
      };
      const toggleSetting = () => {
        setIsSettingOpen(!isSetting);
      };

  return (
    <div className='sidebar uflex'>
      <div className="list-item"><button type='button' className="category-btn" onClick={toggleGeneral}>General <i className="fas fa-chevron-right"></i></button></div>
      <hr className='uhr' />
      {isGeneralOpen && (
        <div className="dropdown-content uflex">
         <div className="item"><Link className="link" to='/overview'>Overview</Link></div>
          <hr className='uhr' />
         <div className="item">Logs</div>
          <hr className='uhr' />
         <div className="item">News & Guides</div>
          <hr className='uhr' />
        </div>
      )}

<div className="list-item"><button type='button' className="category-btn" onClick={toggleUSM}>USM <i className="fas fa-chevron-right"></i></button></div>
      <hr className='uhr' />
      {isUSM && (
        <div className="dropdown-content uflex">
         <div className="item"><Link className="link" to='/SIEM'>SIEM</Link></div>
          <hr className='uhr' />
         <div className="item">UEBA</div>
          <hr className='uhr' />
         <div className="item">Vulnerability</div>
          <hr className='uhr' />
          <div className="item">Threat Hunting</div>
          <hr className='uhr' />
          <div className="item">BSR</div>
          <hr className='uhr' />
          <div className="item">SOAR</div>
          <hr className='uhr' />
          <div className="item">Risk & Compliance</div>
          <hr className='uhr' />
          <div className="item">Mitre Attack</div>
          <hr className='uhr' />
        </div>
      )}

<div className="list-item"><button type='button' className="category-btn" onClick={toggleSetting}>Setting <i className="fas fa-chevron-right"></i></button></div>
      <hr className='uhr' />
      {isSetting && (
        <div className="dropdown-content uflex">
         <div className="item">item7</div>
          <hr className='uhr' />
         <div className="item">item8</div>
          <hr className='uhr' />
         <div className="item">item9</div>
          <hr className='uhr' />
        </div>
      )}

      
    </div>
  )
}

export default Sidebar
