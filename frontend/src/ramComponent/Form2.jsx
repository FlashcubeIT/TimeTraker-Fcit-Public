import React, { useState } from "react";
import "./Form2.css";
import { Container, Col, Row } from "react-bootstrap";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import timerTrakerlogo from "../img/TimeTrakerLogo.png";

const Form2 = () => {
  const [randomNumber, setRandomNumber] = useState(null);
  const [form1, setForm1] = useState({ display: "block" });
  const [form2, setForm2] = useState({ display: "none" });
  const [form3, setForm3] = useState({ display: "none" });
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

  const [formData, setFromData] = useState({
    email: "",
    role: "",
    new_pass: "",
    c_pass: "",
  });
  console.log(formData);
  const [pass, setPass] = useState();

  console.log(formData);
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
      setForm3({ display: "block" });
      setForm2({ display: "none" });
    } else {
      event.preventDefault();
      alert("Please enter valid otp");
    }
  };

  function isValidEmail(emailvalidation) {
    return /\S+@\S+\.\S+/.test(emailvalidation);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    isValidEmail(formData.email);
    if (!isValidEmail(formData.email)) {
      alert("please enter a valid email address");
    } else {
      e.preventDefault();

      const min = 1000; // Minimum 4-digit number
      const max = 9999; // Maximum 4-digit number
      const randomNumUltimate =
        Math.floor(Math.random() * (max - min + 1)) + min;
      setRandomNumber(randomNumUltimate);


      setForm1({ display: "none" });
      setForm2({ display: "block" });

      try {
        e.preventDefault();
        const { data } = await axios.post(
          `http://localhost:8000/api/forgotpass-varifyEmail/?otp=${randomNumUltimate}`,
          formData,
          config
        );
        setFromData((prevData) => ({
          ...prevData,
          role: data.role,
        }));
        if (data) {
          // setForm1({ display: "none" });
          // setForm2({ display: "block" });
        }
      } catch (error) {
        console.log("error from Signup api", error);
        alert("You does not have a account with us");
      }
    }
  };
console.log(pass)
  const handlechangePass = (e) => {
    const { name, value } = e.target;
    setPass((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setFromData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validatePassword = (new_pass) => {
    return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(new_pass);
  };

  const handleSubmitPass = async (e) => {
    e.preventDefault();
    if (pass.new_pass === pass.c_pass) {
      if (validatePassword(pass.new_pass)) {
        e.preventDefault();
        if (formData.role == "admin") {
          try {
            e.preventDefault();
            const { data } = await axios.post(
              "http://localhost:8000/api/admin-forgot-pass",
              formData,
              config
            );
            if (data) {
              navigate("/login");
            }
          } catch (error) {
            e.preventDefault();
            console.log(error);
            alert("invalid password Please try again");
          }
        } else if (formData.role == "sub-admin") {
          e.preventDefault();
          try {
            e.preventDefault();
            const { data } = await axios.post(
              "http://localhost:8000/api/sub-admin-forgot-pass",
              formData,
              config
            );
            if (data) {
              navigate("/login");
            }
          } catch (error) {
            e.preventDefault();
            console.log(error);
            alert("invalid password Please try again");
          }
        } else if (formData.role == "manager") {
          e.preventDefault();
          try {
            e.preventDefault();
            const { data } = await axios.post(
              "http://localhost:8000/api/manager-forgot-pass",
              formData,
              config
            );
            if (data) {
              navigate("/login");
            }
          } catch (error) {
            e.preventDefault();
            console.log(error);
            alert("invalid password Please try again");
          }
        } else if (formData.role == "user") {
          e.preventDefault();
          try {
            e.preventDefault();
            const { data } = await axios.post(
              "http://localhost:8000/api/user-forgot-pass",
              formData,
              config
            );
            if (data) {
              navigate("/login");
            }
          } catch (error) {
            e.preventDefault();
            console.log(error);
            alert("invalid password Please try again");
          }
        }
      } else {
        e.preventDefault();
        alert("Password must be contain 8 characters with atleast one uppercase letter, one lowercase letter, and one number");
      }
    } else {
      e.preventDefault();
      alert("Password not matched");
    }
  };

  return (
    <div style={{ height: "100%" }}>
      <Container
        fluid
        className="header-container1"
        style={{ paddingRight: "0", paddingLeft: '0' }}
      >
        <Row className="main_parent_of_form" style={{ padding: '0' }}>
          {/* Right column */}


          {/* form 1 */}
          <Col style={form1} className="header-right_forgotPass_page" md={12}>
            <div className="head-text1">
              {/* <h1>Logo</h1> */}
              <img width="70px" src={timerTrakerlogo} alt="" />
              <p>Simplify your time and expense management today.</p>
              {/* <span>No credit card required. Cancel anytime.</span> */}
            </div>
            <Form onSubmit={handleSubmit}>
              <Row style={{ marginBottom: "20px" }}>
                <Form.Group className="mb-1 mt-5 " controlId="formGroupEmail">
                  <Form.Label className="mx-5">
                    Enter your email address{" "}
                    <i className="fa-sharp fa-light fa-asterisk"></i>
                  </Form.Label>
                  <Form.Control
                    style={{
                      width: "85%", margin: 'auto'
                    }}
                    onChange={handleChange}
                    name="email"
                    type="email"
                  />
                </Form.Group>
              </Row>

              <div
                className="d-grid gap-5 headBtn1"
                style={{ width: "85%", margin: 'auto' }}
              >
                <Button className="continue-btn" type="submit">Continue</Button>
              </div>
            </Form>

            <div className="head-bottom-text1">
              <p className="text" style={{ fontSize: '15px' }} >
                Already have an account ?{" "}
                <span style={{ cursor: 'pointer' }} onClick={() => navigate("/login")}>Sign in here</span>{" "}
              </p>
              <p className="text2">
                <span style={{ cursor: 'pointer', fontSize: '15px' }} > Need Assistance?</span>
              </p>
            </div>
          </Col>


          {/* form 2 */}
          <div className="parent_header-container4" style={form2}>
            <div style={{ height: "100%" }}>
              <Container
                fluid
                className="header-container4"
                style={{ paddingRight: "0" }}
              >
                <Row style={{ height: "100%" }}>
                  {/* <Col md={7}></Col> */}

                  {/* Right column */}
                  <Col md={12} className="header-right3">
                    <div className="head-text3">
                      {/* <h1>Logo</h1> */}
                      <img
                        src={timerTrakerlogo}
                        alt=""
                        style={{ width: "70px" }}
                      />
                      <p>Simplify your time and expense management today.</p>
                      {/* <span>No credit card required. Cancel anytime.</span> */}
                    </div>

                    <div className="box-div">
                      <p>
                        Enter a 4-digit verification code{" "}
                        <i className="fa-sharp fa-light fa-asterisk"></i>
                      </p>

                      <div className="box-container">
                        <form className="box1 form">
                          <input
                            className="form2Input"
                            required
                            onChange={handleChangeOtp}
                            type="text"
                            name="otp"
                            id=""
                          />
                        </form>
                      </div>

                      <p>
                        If you didn't receive code. <span style={{ cursor: 'pointer' }} >Resend</span>
                      </p>
                    </div>

                    <div
                      style={{ marginTop: "20px" }}
                      className="d-grid gap-5 headBtn4 mt-5 "
                    >
                      <Button style={{ width: "85%", margin: 'auto' }} onClick={handleConcatenate} type="submit">
                        Continue
                      </Button>
                    </div>
                    <div
                      style={{ marginTop: "90px" }}
                      className="head-bottom-text3"
                    >
                      <p className="text" style={{ cursor: 'pointer', fontSize: '15px' }}>
                        Already have an account? {" "}
                        <span style={{ cursor: 'pointer', fontSize: '15px' }} onClick={() => navigate("/login")}>
                          Sign in here
                        </span>{" "}
                      </p>
                      <p className="text3">
                        <span style={{ cursor: 'pointer', fontSize: '14px' }} >Need  Assistance?</span>
                      </p>
                    </div>
                  </Col>
                </Row>
              </Container>
            </div>
          </div>

          {/* form 3 */}

          <div className="parent_header-container4" style={form3}>
            <Container
              fluid
              className="header-container4"
              style={{ paddingRight: "0" }}
            >
              <Row style={{ height: "100%" }}>
                {/* Right column */}
                <Col className="header-right4">
                  <div className="head-text4">
                    {/* <h1>Logo</h1> */}
                    <img src={timerTrakerlogo} alt="" />
                    <p>Simplify your time and expense management today.</p>
                    {/* <span>No credit card required. Cancel anytime.</span> */}
                  </div>
                  <Form onSubmit={handleSubmitPass}>
                    <Row className="mb-3 mt-5">
                      <Form.Group as={Col} controlId="formGroupEmail">
                        <Form.Label className="mx-5">
                          Reset New Password
                          <i className="fa-sharp fa-light fa-asterisk"></i>
                        </Form.Label>
                        <Form.Control
                          style={{ width: "85%", margin: 'auto' }}
                          name="new_pass"
                          onChange={handlechangePass}
                          type="password"
                        />
                      </Form.Group>
                    </Row>
                    <Row>
                      <Form.Group as={Col} controlId="formGroupEmail">
                        <Form.Label className="mx-5" >
                          Re-Enter-Password
                          <i className="fa-sharp fa-light fa-asterisk"></i>
                        </Form.Label>
                        <Form.Control
                          style={{ width: "85%", margin: 'auto' }}
                          onChange={handlechangePass}
                          name="c_pass"
                          type="password"
                        />
                      </Form.Group>
                    </Row>
                    <div
                      style={{
                        display: 'flex',
                        // justifyContent: 'center',
                        alignItems: 'center',
                        // width: "100%",
                        // marginRight: "10px",
                        // marginLeft: "0"
                        // minWidth: '100%'

                      }}
                      className="d-grid gap-2 headBtn4 mt-5"
                    >
                      <Button style={{ width: "95%", margin: 'auto' }} type="submit">Reset Password</Button>
                    </div>
                  </Form>

                  <div className="head-bottom-text4">
                    <p className="text">
                      already have an account ?{" "}
                      <span style={{ cursor: 'pointer' }} onClick={() => navigate("/login")}>
                        Sign in here
                      </span>{" "}
                    </p>
                    <p className="text2 mb-3">
                      <span style={{ cursor: 'pointer' }}>Need  Assistance?</span>
                    </p>
                  </div>
                </Col>
              </Row>
            </Container>

          </div>
        </Row>
      </Container>
    </div>
  );
};

export default Form2;
