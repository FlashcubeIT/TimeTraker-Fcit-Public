import React, { useState, useContext, useEffect } from "react";
import "./FormRideSide.css";
import { Container, Col, Row } from "react-bootstrap";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { MyContext } from "../context/MyProvider";
import timerTrakerlogo from "../img/TimeTrakerLogo.png";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FormRideSide = () => {

  const { setLoading, setSendPass } = useContext(MyContext);

  const [randomNumber, setRandomNumber] = useState(null);
  const [form1, setForm1] = useState({ display: "block" });
  const [form2, setForm2] = useState({ display: "none" });

  const [inputData, setInputData] = useState({
    otp: "",
  });

  // config
  const config = {
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
  };







  const [formData, setFromData] = useState({});
  const navigate = useNavigate();

  const handleChangeOtp = (e) => {
    const { name, value } = e.target;
    setInputData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleChange = (e) => {

    const { name, value } = e.target;
    setFromData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleConcatenate = async (event) => {
    event.preventDefault();
    if (inputData.otp == randomNumber) {
      console.log("otp varifyed");
      event.preventDefault();
      try {
        
        setLoading(true);
        event.preventDefault();
        const { data } = await axios.post(
          "http://localhost:8000/api/admin-register",
          formData,
          config
        );
        console.log(data);
        if (data) {
          setLoading(false);
          setSendPass(true)
          navigate(`/login`);
        }
      } catch (error) {
        setLoading(false);
        event.preventDefault();
        alert("something went wrong");
      }
    } else {
      event.preventDefault();
      alert("Please enter valid otp");
    }
  };

  function isValidEmail(emailvalidation) {
    return /\S+@\S+\.\S+/.test(emailvalidation);
  }

  const validatePhoneNumber = (phoneNumber) => {
    // Define a regular expression pattern for a 10-digit US phone number
    // const pattern = /^\d{10}$/;
    return /^\d{10}$/.test(phoneNumber);
  };

  const handleSubmit = async (e) => {
    isValidEmail(formData.email);
    if (!isValidEmail(formData.email)) {
      alert("please enter a valid email address");
    } else {
      validatePhoneNumber(formData.phone);
      if (!validatePhoneNumber(formData.phone)) {
        alert("please enter a valid phone number");
      } else {
        if (formData.c_password != formData.password) {
          alert("Password Confirm Password is not matched");
        } else {
          e.preventDefault();

          const min = 1000; // Minimum 4-digit number
          const max = 9999; // Maximum 4-digit number
          const randomNumUltimate =
            Math.floor(Math.random() * (max - min + 1)) + min;
          setRandomNumber(randomNumUltimate);

          console.log(formData);
          try {

            const { data } = await axios.post(
              `http://localhost:8000/api/admin-varifyEmail/?otp=${randomNumUltimate}`,
              formData,
              config
            );
            if (data?.message == "email exist") {
              alert("Email already exist, Please try with another email address")
            }
            else if (data?.message == "name exist") {
              alert("name already exist, Please chnage the name")
            } else {
              showOtpNotification()
              setForm1({ display: "none" });
              setForm2({ display: "block" });
            }
          } catch (error) {
            console.log("error from Signup api", error);
            alert("Something went wrong please try again");
          }
        }
      }
    }
  };




  const showOtpNotification = () => {
    toast.success('OTP has been send in your email', {
      position: 'top-right',
      autoClose: 6000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };


  return (
    <div style={{ height: "100%" }}>
      {/* Right column */}
      <ToastContainer />
      <div className="header-right" style={form1}>
        <div className="head-text">
          {/* <h1>Logo</h1> */}
          <img className="timeTrakerLogo" src={timerTrakerlogo} alt="" />
          <p>Simplify your time and expense management today.</p>
          <span>No credit card required. Cancel anytime.</span>
        </div>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-4 mt-4">
            <Form.Group as={Col} controlId="formGroupEmail">
              {/* <Form.Label>Fist Name<i className="fa-sharp fa-light fa-asterisk"></i> </Form.Label> */}
              <Form.Control
                required
                onChange={handleChange}
                name="name"
                type="text"
                placeholder="Your Name "
                className="singup-input"
              />
            </Form.Group>

            {/* <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Last Name<i className="fa-sharp fa-light fa-asterisk"></i></Form.Label>
                            <Form.Control required onChange={handleChange} name="lastName" type="text" />
                        </Form.Group> */}
          </Row>

          <Row>
            <Form.Group className="mb-4" controlId="formGroupEmail">
              {/* <Form.Label>Email<i className="fa-sharp fa-light fa-asterisk"></i></Form.Label> */}
              <Form.Control
                required
                onChange={handleChange}
                name="email"
                type="email"
                placeholder="Your Email"
                className="singup-input"
              />
            </Form.Group>

            <Form.Group className="mb-4" controlId="formGroupEmail">
              {/* <Form.Label>Company Name<i className="fa-sharp fa-light fa-asterisk"></i></Form.Label> */}
              <Form.Control
                required
                onChange={handleChange}
                name="companyName"
                type="text"
                placeholder="Company Name"
                className="singup-input"
              />
            </Form.Group>

            <Form.Group className="mb-4" controlId="formGroupEmail">
              {/* <Form.Label>Phone Number<i className="fa-sharp fa-light fa-asterisk"></i></Form.Label> */}
              <Form.Control
                required
                onChange={handleChange}
                name="phone"
                type="text"
                placeholder="Phone Number"
                className="singup-input"
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            {/* <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Password<i className="fa-sharp fa-light fa-asterisk"></i></Form.Label>
                            <Form.Control required onChange={handleChange} name="password" type="text" />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Confirm Password<i className="fa-sharp fa-light fa-asterisk"></i></Form.Label>
                            <Form.Control required onChange={handleChange} name="c_password" type="text" />
                        </Form.Group> */}

            <div className="d-grid gap-3 headBtn mt-1">
              <Button type='submit' className='btn'>Start Your Free Trial</Button>
            </div>
          </Row>
        </Form>

        <div className="head-bottom-text">
          <p className="text">
            Already have an account ?{" "}
            <span
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/login")}
            >
              Login here

            </span>{" "}
          </p>
          <p>
            <span style={{ cursor: 'pointer' }} >Need Assistance?</span>
          </p>
        </div>
      </div>

      {/* form 2 */}
      <div className="parent_header-container4" style={form2}>
        <div style={{ height: "100%" }}>
          <Container
            fluid
            className="header-container4"
            style={{ paddingRight: "0" }}
          >
            <Row style={{ height: "100%", paddingRight: "0" }}>
              {/* <Col md={7}></Col> */}

              {/* Right column */}
              <Col md={12} className="header-right3">
                <div className="head-text3">
                  {/* <h1>Logo</h1> */}
                  <img className="" width="70px" src={timerTrakerlogo} alt="" />
                  <p>Simplify your time and expense management today.</p>
                  {/* <span>No credit card required. Cancel anytime.</span> */}
                </div>

                <div className="box-div mt-4">
                  <p>
                    Enter a 4-digit verification code{" "}
                    <i className="fa-sharp fa-light fa-asterisk"></i>
                  </p>

                  <div className="box-container">
                    <form className="box1">
                      <input
                        className="verificaton-code"
                        required
                        onChange={handleChangeOtp}
                        type="text"
                        name="otp"
                        id=""
                      />
                    </form>
                  </div>

                  <p>
                    If you didn't receive code. <span>Resend</span>
                  </p>
                </div>

                <div
                  style={{ marginTop: "30px" }}
                  className="d-grid gap-5 headBtn4"
                >
                  <Button onClick={handleConcatenate}>Continue</Button>
                </div>
                <div
                  style={{ marginTop: "140px" }}
                  className="head-bottom-text3"
                >
                  <p className="text" style={{ fontSize: '15px' }} >
                    already have an account?{" "}
                    <span onClick={() => navigate("/login")}>Sign up here </span>{" "}
                  </p>
                  <p className="text3">
                    <span style={{ fontSize: '15px' }} >  Need Assistance?</span>
                  </p>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default FormRideSide;
