import React, { useState } from "react";
import "./ContactSection.css";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import formlogo from "../img/TimeTrakerLogo.png"
import Footer2 from "../components/Footer2";
import { useNavigate } from "react-router-dom";
import contactHeroImg from "../img/contactHeroImg.jpg"


const ContactSection = () => {
  const navigate= useNavigate()

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    companyName: "",
    phoneNumber: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    // Validate First Name
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First Name is required";
      valid = false;
    }

    // Validate Last Name
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last Name is required";
      valid = false;
    }

    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      newErrors.email = "Invalid Email address";
      valid = false;
    }

    // Validate Company Name
    if (!formData.companyName.trim()) {
      newErrors.companyName = "Company Name is required";
      valid = false;
    }

    // Validate Phone Number
    const phoneRegex = /^\d{10}$/;
    if (
      !formData.phoneNumber.trim() ||
      !phoneRegex.test(formData.phoneNumber)
    ) {
      newErrors.phoneNumber = "Invalid Phone Number (10 digits)";
      valid = false;
    }

    // Validate Message
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // emailjs.sendForm('service_rfyf6q5', 'template_eb8gf3j', form.current, 'co_XHnyZaa5HHJ609')
    //   .then((result) => {
    //       console.log(result.text);
    //   }, (error) => {
    //       console.log(error.text);
    //   });

    // Validate the form before submission
    if (validateForm()) {
      // Process the form data
      alert("Form is Submitted");
      console.log("Form submitted:", formData);
    } else {
      // alert("Please fill the form");
    }
    

  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div style={{background:'#fff'}} >
      {/* navbar */}
       <div className="contactNavbar" >
        <Navbar />
       </div>





  
    <div
      className="contact"
      style={{ marginTop: "70px" }}
    >
      <div className="contact-top">
       <div className="formlogo" >
        <img src={formlogo} alt="" />
       </div>
        <p>
          "We're here to assist you with any questions you may have. Complete
          the form, and we'll respond promptly."
        </p>
      </div>

      <Form className="contact-container" onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>
              First Name <i className="fa-solid fa-asterisk"></i>{" "}
            </Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
            {errors.firstName && <span>{errors.firstName}</span>}
          </Form.Group>

          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>
              Last Name <i className="fa-solid fa-asterisk"></i>{" "}
            </Form.Label>
            <Form.Control
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
            {errors.lastName && <span>{errors.lastName}</span>}
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" controlId="formGridPassword">
          <Form.Label>
            Email <i className="fa-solid fa-asterisk"></i>{" "}
          </Form.Label>
          <Form.Control
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span>{errors.email}</span>}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGroupPassword">
          <Form.Label>
            Company Name <i className="fa-solid fa-asterisk"></i>{" "}
          </Form.Label>
          <Form.Control
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
          />
          {errors.companyName && <span>{errors.companyName}</span>}
        </Form.Group>

        <Form.Group className="mb-4" controlId="formGroupPassword">
          <Form.Label>
            Phone Number <i className="fa-solid fa-asterisk"></i>{" "}
          </Form.Label>

          {/* <PhoneInput
            name="phoneNumber"
            country={"us"}
            value={this.state.phone}
            value={formData.phoneNumber}
            onChange={(phone) => this.setState({ phone })}
            onChange={handleChange}
            inputProps={
              {required: true,
            }
            }
          /> */}

          <Form.Control
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
          {errors.phoneNumber && <span>{errors.phoneNumber}</span>}
        </Form.Group>

        <textarea
          id=""
          cols=""
          rows=""
          placeholder="How can we help you ?"
          name="message"
          value={formData.message}
          onChange={handleChange}
        ></textarea>
        {errors.message && <span>{errors.message}</span>}

        <div className="d-grid gap-2 mt-4 mb-5 contactBtn">
          <Button size="lg" type="submit">
            Send Message
          </Button>
        </div>
      </Form>
    </div>


    
       {/* contactHero */}
       <div className="contactHero">
        <div className="contactHeroLeft">
          <h1>Online Time And Expense Tracking</h1>
          <p>TimerTraker is a time and expense tracking software that syncs with QuickBooks Desktop and QuickBooks Online and enables employees, company vendors or sub-contractors to enter time and expenses from their PCs, Macs, iPhone and Android devices.</p>
          <div>
            <button
              className="featButton" 
              style={{marginTop: '20px'}} 
              onClick={() => {
                navigate("/signup");
              }}
            >
              Start a free trial
            </button>
          </div>
        </div>

        <div className="contactHeroRight">
          <img src={contactHeroImg} alt="" />
        </div>
       </div>




    {/* Contact us */}
    <div className="contactBottomMain">
      <h5>GET IN TOUCH</h5>
      <h1>Contact Us</h1>

      <div className="contactBottomContainer">
        <div className="contactBottom">
          <i className="fa fa-headphones" ></i>
          <a href="tel:9717597230" >9717597230</a>
          <span>Support</span>
        </div>

        <div className="contactBottom">
        <i class="fa-solid fa-phone"></i>
          <a style={{color: '#04542c'}} href="tel:9911503621" >9911503621</a>
          <span>Sales</span>
        </div>

        <div className="contactBottom">
        <i class="fa-solid fa-envelope"></i>
          <a style={{color: '#04542c'}} href="mailto:timetraker@gmail.com">timetraker@gmail.com</a>
          <span>Email</span>
        </div>

      </div>
    </div>





{/* footer */}
    <Footer />
    <Footer2 />
    </div>
  );
};

export default ContactSection;
