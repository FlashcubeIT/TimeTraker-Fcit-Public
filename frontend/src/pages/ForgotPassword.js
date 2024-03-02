

import React from 'react'
import "./Signup.css"
import LeftSide1 from '../ramComponent/LeftSide1'
import Form2 from '../ramComponent/Form2'
import { Col, Container, Row } from 'react-bootstrap'


import timerTrakerlogo from "../img/TimeTrakerLogo.png"

const ForgotPassword = () => {
    return (
        <div className='parent_div'>
            <div className='main-container' >
                <Container fluid className='header-container' style={{backgroundColor: '#b1f1c6', borderRadius: '50px', paddingRight: '0'}}>
                    <Row>
                        <Col xs={12} sm={12} md={12} lg={7}>
                            <LeftSide1 />
                        </Col>

                        <Col style={{padding: '0px'}} xs={12} sm={12} md={12} lg={5} >
                            <Form2 />
                        </Col>

                    </Row>
                </Container>
            </div>
        </div>
    )
}

export default ForgotPassword
