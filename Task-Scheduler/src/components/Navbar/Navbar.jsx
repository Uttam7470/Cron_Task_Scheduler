import React from 'react'
import './Navbar.css'
import { FaRegUserCircle } from "react-icons/fa";
import { IoReorderThreeOutline } from "react-icons/io5";
function Navbar() {
  return (
    <>
    <div className="navbar">
        <div className="first">
            <IoReorderThreeOutline  style={{fontSize:"2.5rem"}}/>
            <p>JOBS</p>
        </div>
        <div className="second">
            <div className="logo">
                Logo
            </div>
        </div>
        <div className="third">
            <i>Time</i>
            <FaRegUserCircle />profile
        </div>
    </div>
    </>
  )
}

export default Navbar