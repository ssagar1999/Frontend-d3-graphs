import React from 'react'
import './CustomChart.css'

const CustomChart = () => {

    const data = [
        {Content:"Firewall Modification", Priority: "High", color:"red"},
        {Content:"User Privilege changes", Priority: "Higher", color:"orange"},
        {Content:"Traffic spike", Priority: "Medium", color:"grey"},
        {Content:"Multiple Login Attempts (1)", Priority: "Normal", color:"gray"},
        {Content:"Multiple Login Attempts", Priority: "Normal", color:"gray"},
    ]
  return (
    <div className='customChart-container uflex'>

        {data.map((item,index)=> 
        (<div className="a-bdy uflex">
        <span style={{backgroundColor: item.color}}></span><div className='text'><h3>{item.Priority}</h3><h3>{item.Content}</h3> </div>
        </div>)
    )}
    </div>
  )
}

export default CustomChart
