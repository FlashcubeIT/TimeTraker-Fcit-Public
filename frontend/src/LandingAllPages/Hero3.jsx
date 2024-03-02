import React from "react";
import "./Hero3.css";
import { Col, Container, Row } from "react-bootstrap";
import hero3Img from "../img/getImg1.jpg";
import hero3img1 from "../img/getImg2.jpg";
import hero3img2 from "../img/feedIconImg.jpg";

const Hero3 = () => {
  return (
    <div >
      <Container>
        <Row className="hero3-container">
          {/* columgn left */}
          <Col lg={5} md={12} sm={12} xs={12}>
            <div className="hero3-left">
              <img className="img-Fluid" src={hero3Img} alt="" />
            </div>
          </Col>

          {/* column right */}
          <Col lg={7} md={12} sm={12} xs={12}>
            <div className="hero3-right">
              <h1>If you have any questions, please get in touch now.</h1>
              <p>
                Have questions about your TimeTraker? Reach out to us now. Our
                dedicated team in the TimeTraker is here to assist you. Your
                oral all doubt is our priority.
              </p>

              <div className="text-img-container">
                <div className="text-img-left">
                  <img className="iconImg" src={hero3img1} alt="" />
                  <h6>Project Management</h6>
                  <p>
                  "Maximize project success with TimeTraker: streamline task allocation, track progress, enhance collaboration, and access insightful analytics for informed decision-making. Elevate your project management experience effortlessly with TimeTraker."
                  </p>
                </div>

                <div className="text-img-right">
                  <img className="iconImg" src={hero3img2} alt="" />
                  <h6>Reporting and Analytics</h6>
                  <p>
                  Unlock data-driven insights with TimeTraker's robust reporting and analytics features. Effortlessly generate comprehensive reports, analyze project performance, and make informed decisions to optimize productivity and achieve your goals."
                  </p>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Hero3;
