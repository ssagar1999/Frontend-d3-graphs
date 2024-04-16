import { useState } from 'react'
import './App.css'
import { Outlet } from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar';




function App() {

  return (
    <>
      <Navbar/>
      <Outlet/>
      {/* <h1 className='signature'>Developed By Rahul</h1> */}
    </>
  )
}

export default App
