import React, { useState } from "react";
import "./Navbar.css";
import Sidebar from "../Sidebar/Sidebar";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
    <nav className="navbar uflex">
      <button  className="menu-btn" onClick={toggleMenu}><i className="fas fa-bars"></i></button>
      <div className="search-bar uflex"><input className="search-input sc" placeholder="Search..."></input> <button className="search-btn sc"><i className="fas fa-search"></i></button></div>
    </nav>
    {/* {isOpen && <Sidebar />} */}
    <Sidebar/>
    </>
  );
};

export default Navbar;
