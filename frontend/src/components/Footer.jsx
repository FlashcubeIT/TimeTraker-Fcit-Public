import React from 'react'
import logo from "../img/TimeTrakerLogo.png"
import "./Footer.css"
import { Container, Row, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const Footer = () => {
    const navigate= useNavigate();
    return (
        <div id='about' >
            <Container style={{padding:"0px"}} fluid>
                <Row className='footer-container'>
                    <Col md={3}>
                        <div className='footer-top'>
                            {/* <h1>Logo</h1> */}
                            <img src={logo} alt="" />
                            <p>“Time management solutions tailored to match your business needs and financial constraints”</p>
                        </div>
                    </Col>

                    <Col md={5}>
                    
                    </Col>

                    <Col md={4}>
                        <div className='footer-bottom'>
                            <h1>Be Our Subscriber</h1>
                            <p>To get the latest news about Timetraker from our experts</p>
                            <div className='footer-Btn'>
                                <input type="email" style={{ fontFamily: "League Spartan" }} name="search" placeholder='Email Address' id="" />
                                <button>Subscribe</button>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
            <ul className='footer-middle'style={{flexDirection: 'row',background:' rgba(100, 228, 142, 0.50)', marginBottom: '0px', paddingBottom: '20px'}} >
            <li onClick={()=>{navigate('/')} } >Home</li>
                <li onClick={() => {navigate('/aboutpage')}} >About Us</li>
                <li onClick={()=>{navigate('/features')}}>Features</li>
                <li onClick={() =>{navigate('/pricepage')} } >Pricing</li>
                <li onClick={() => {navigate('/blogpage')} } >Blog</li>
                <li onClick={() => {navigate('/faqpage')}} >FAQ’s</li>
                <li onClick={() => {navigate('/contactpage')}} >Contact Us</li>
                <li onClick={() => {navigate('/daily-timesheet-manual')}} >User Manual</li>
                <li onClick={() => {navigate('/technical-doc')}} >Technical Documentation</li>
            </ul>
        </div>
    )
}

export default Footer