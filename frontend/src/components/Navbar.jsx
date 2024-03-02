import React, { useState } from "react";
import "./Navbar.css"
import { Link } from 'react-router-dom'
import logo from "../img/TimeTrakerLogo.png"
import { useNavigate } from 'react-router-dom'



const Navbar = ({data}) => {
    const [click, setClick] = useState(true);

  const handleClick = () => {
    setClick(!click);
  };
    const navigate = useNavigate()

 
  return (
        <div className= {data ? 'navbar-container new_nav_back' : 'navbar-container'}   >
            <div className="nav-logo">
                <img style={{width: '100%', marginTop: '5px',marginLeft: '10px' }} src={logo} alt="" />
            </div>

            <ul className={click ? "nav-menu " : "nav-menu active"}>
                <li onClick={()=>{navigate('/')} } >Home</li>
                <li onClick={() => {navigate('/aboutpage')}} >About Us</li>
                <li onClick={()=>{navigate('/features')}}>Features</li>
                <li onClick={() =>{navigate('/pricepage')} } >Pricing</li>
                <li onClick={() => {navigate('/blogpage')} } >Blog</li>
                <li onClick={() => {navigate('/faqpage')}} >FAQ’s</li>
                <li onClick={() => {navigate('/contactpage')}} >Contact Us</li>
            </ul>

            <div className="nav-button">
                <button onClick={()=>{navigate('/login')}} className='nav-btn1'>Sign In</button>
                <button onClick={()=>{navigate('/signup')}} className='nav-btn2'>Try Free</button>
            </div>

            <div className="hamburger" onClick={handleClick}>
        {" "}
        {click ? (
          <i className="fas fa-bars"></i>
        ) : (
          <i className="fas fa-times"></i>
        )}
      </div>

        </div>
    
  )
}

export default Navbar