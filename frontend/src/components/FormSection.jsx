import React, {useState} from 'react'
import "./FormSection.css"
import circleImg1 from "../img/circle1.png"
import circleImg2 from "../img/circle2.png"
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import FormImg from "../img/FormImg.png"
import axios from "axios";


const FormSection = () => {


    // config

    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

  const [formData, setFormData] = useState({})


  function isValidEmail(emailvalidation) {
    return /\S+@\S+\.\S+/.test(emailvalidation);
  }

  const validatePhoneNumber = (phoneNumber) => {
    // Define a regular expression pattern for a 10-digit US phone number
    // const pattern = /^\d{10}$/;
    return /^\d{10}$/.test(phoneNumber);
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleSubmit = async (e) => {
    isValidEmail(formData.email);
    if (!isValidEmail(formData.email)) {
      alert("please enter a valid email address");
    } else {
      validatePhoneNumber(formData.number);
      if (!validatePhoneNumber(formData.number)) {
        alert("please enter a valid phone number");
      } else {
  
          e.preventDefault();
          try {
          
            const { data } = await axios.post(
              `http://localhost:8000/api/sendContactMail`,
              formData,
              config
            );
        
            if(data){
              alert("Thanks, for submiting the form. We will contact you soon")
              setFormData({
                site: "",
                number: "",
                email: "", 
                lastName: "",
                firstName: ""
              })
            }else{
              setFormData({
                site: "",
                number: "",
                email: "", 
                lastName: "",
                firstName: ""
              })
            }
         
            
          } catch (error) {
            console.log("error from Signup api", error);
            setFormData({
              site: "",
              number: "",
              email: "", 
              lastName: "",
              firstName: ""
            })
          }
        
      }
    }
  };





  return (
    <div id='contact' className='form-container'>
      <Form onSubmit={handleSubmit}>
        <h1>Get a free demo</h1>
        <p>Experience our premimum Future for free</p>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label >First name</Form.Label>
            <Form.Control  value={formData.firstName}         onChange={handleChange} name= "firstName" type="text" required />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label  >Last name</Form.Label>
            <Form.Control  value={formData.lastName}          onChange={handleChange} name= "lastName" type="text" required />
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" controlId="formGridAddress1">
          <Form.Label >Email</Form.Label>
          <Form.Control   value={formData.email}         onChange={handleChange} name="email" type="email" required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGridAddress1">
          <Form.Label >Phone No</Form.Label>
          <Form.Control    value={formData.number}          onChange={handleChange} name="number"  type="number" required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGridAddress1">
          <Form.Label >Company Website</Form.Label>
          <Form.Control      value={formData.site}      onChange={handleChange} name="site" type="text" required />
        </Form.Group>


        <div className="d-grid mt-5 gap-3 form-btn" style={{width: '100%'}} >
          <Button  style={{minWidth: '100%'}} type='submit'>Schedule a Demo</Button>
        </div>
      </Form>

      <div className="form-img">
        <img className='circle1' src={circleImg1} alt="" />
        <img className='form-img' src={FormImg} alt="" />
        <img className='circle2' src={circleImg2} alt="" />
      </div>

    </div>
  )
}

export default FormSection