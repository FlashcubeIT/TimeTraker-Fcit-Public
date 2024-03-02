

import React ,{useContext} from 'react'
import "./Signup.css"
import LeftSide1 from '../ramComponent/LeftSide1'
// import Form1 from '../components/Form1'
import FormRideSide from '../ramComponent/FormRideSide'
import { Col, Container, Row } from 'react-bootstrap'
import { MyContext } from '../context/MyProvider'
import Loder from '../components/Loder'

const SignupPage = () => {
  const { loading } = useContext(MyContext);
  return (
    <div >
      {
        loading ?
          <Loder className='loder' />
          :
          console.log("")
      }
      <div style={ loading ? {    filter: 'blur(2px)'} : console.log('')} className='parent_div'>
        <div className='main-container'>
        <Container fluid className='header-container'>
            <Row className='background-color' >
              <Col lg={7} md={12} sm={12} xs={12}>
                <LeftSide1 />
              </Col>


              <Col style={{padding:"0px"}} lg={5} md={12} sm={12} xs={12}>
                <FormRideSide />
              </Col>
              
            </Row>
          </Container>
        </div>
      </div>
    </div>
  )
}

export default SignupPage
