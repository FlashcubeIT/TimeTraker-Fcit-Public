


import React, { useContext, useEffect, useState } from 'react'
import "./Signup.css"
import LeftSide1 from '../ramComponent/LeftSide1'
import { Col, Container, Row } from 'react-bootstrap'
import { MyContext } from '../context/MyProvider'
import Loder from '../components/Loder'
import { Grid } from "@mui/material"
import LeftSideBar from './Prakashcomponent/LeftSideBar'
import LoginForm from './Prakashcomponent/LoginForm'
import { ToastContainer, toast } from 'react-toastify';

const LoginPage = () => {
  const { loading, sendPass } = useContext(MyContext);
console.log("sendPass", sendPass)

  const accountCreateNottification = () => {
    toast.success('Your account is crested', {
      position: 'top-right',
      autoClose: 6000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  
  const passCreateNottification = () => {
    toast.success('Password has been send in your email', {
      position: 'top-right',
      autoClose: 6000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  useEffect(()=>{
    if (sendPass == true) {
      accountCreateNottification()
      passCreateNottification()
    }
  },[])
  
  return (
    <div >
      <ToastContainer />
      {
        loading ?
          <Loder className='loder' />
          :
          console.log("")
      }
      <div style={loading ? { filter: 'blur(2px)' } : console.log('')} className='parent_div'>

        {/* <div className='main-container'>
          <Container fluid className='header-container'>
            <Row>
              <Col md={7}>
                <LeftSide1 />
              </Col>

              <Col style={{padding: 0}} md={5}>
                <LoginForm />
              </Col>

            </Row>
          </Container>
        </div> */}

        <div className='main_parent_for_login for_lap_only_form'>
          <Grid style={{ width: "100%", height: "100%" }} container>
            <Grid lg={7} md={7} index>
              <LeftSideBar />
            </Grid>
            <Grid style={{ height: "100%" }} lg={5} md={5} sx={12} index>
              <LoginForm />
            </Grid>
          </Grid>
        </div>
        <div className='main_parent_for_login for_phone_only_form'>
          <LoginForm />
        </div>
      </div>

    </div>
  )
}

export default LoginPage



