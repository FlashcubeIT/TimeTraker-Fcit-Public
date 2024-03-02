import React, { useState } from "react";
import "./Faq.css";
import faqleftImg from "../img/faqLeftImg.svg";
import { Col, Container, Row } from "react-bootstrap";

const Faq = () => {
  const [toggle1, setToggle1] = useState(true);
  const [toggle2, setToggle2] = useState(true);
  const [toggle3, setToggle3] = useState(true);
  const [toggle4, setToggle4] = useState(true);
  const [toggle5, setToggle5] = useState(true);
  const [toggle6, setToggle6] = useState(true);

  const handleToggle1 = () => {
    setToggle1(!toggle1);
  };
  const handleToggle2 = () => {
    setToggle2(!toggle2);
  };
  const handleToggle3 = () => {
    setToggle3(!toggle3);
  };
  const handleToggle4 = () => {
    setToggle4(!toggle4);
  };
  const handleToggle5 = () => {
    setToggle5(!toggle5);
  };
  const handleToggle6 = () => {
    setToggle6(!toggle6);
  };

  return (
    <div className="faqContainer">
      <Container>
        <Row>
          {/* <Col xs={12} sm={12} md={12} lg={6}>
            <div className="faqLeft">
              <img src={faqleftImg} alt="" />
            </div>
          </Col> */}

          <Col xs={12} sm={12} md={12} lg={12}>
            <div className="mainContainer">
              <div>
                <h2>Support</h2>
                <h4>Frequently Asked Question</h4>
              </div>

              <div className="headContainer">
                <div className="headIcon">
                  <i
                    onClick={handleToggle1}
                    class={
                      toggle1
                        ? "fa-solid fa-chevron-down icon1 "
                        : "fa-solid fa-chevron-up icon2 "
                    }
                  ></i>
                  <h1 onClick={handleToggle1}>
                  WHAT IS A "TIMETRAKER", AND HOW DOES IT WORK?
                  </h1>
                </div>
                <div
                  className="Para"
                  style={{ display: toggle1 ? "none" : "block" }}
                >
                  <p>
                  A "TIMETRAKER" is a software tool or application that helps individuals or businesses monitor and record the time spent on various tasks and activities. It is commonly used for tracking work hours, project management, productivity analysis, and billing purposes.
                  </p>
                </div>
              </div>

              <div className="headContainer">
                <div className="headIcon">
                  <i
                 
                    onClick={handleToggle2}
                    class={
                      toggle2
                        ? "fa-solid fa-chevron-up icon2 " 
                        : "fa-solid fa-chevron-down icon1 "
                    }
                  ></i>
                  <h1 onClick={handleToggle2}>
                  WHY SHOULD I USE A "TIMETRAKER" FOR MY BUSINESS OR PERSONAL ACTIVITIES?
                  </h1>
                </div>
                <div
                  className="Para"
                  style={{ display: toggle2 ? "block" : "none" }}
                >
                  <p>
                  In both business and personal contexts, "TIMETRAKER" provides valuable data that can lead to improved decision-making, increased efficiency, and a better balance between work and personal life. It's a tool that empowers you to make the most of your time and resources.
                  </p>
                </div>
              </div>

              <div className="headContainer">
                <div className="headIcon">
                  <i
                 
                    onClick={handleToggle3}
                    class={
                      toggle3
                        ? "fa-solid fa-chevron-down icon1 "
                        : "fa-solid fa-chevron-up icon2 "
                    }
                  ></i>
                  <h1 onClick={handleToggle3}>
                  IS IT POSSIBLE TO TRACK TIME ON MULTIPLE PROJECTS OR TASKS SIMULTANEOUSLY?
                  </h1>
                </div>
                <div
                  className="Para"
                  style={{ display: toggle3 ? "none" : "block" }}
                >
                  <p>
                  Integrating a "TIMETRAKER" with other business tools can lead to increased efficiency, accuracy, and productivity. It streamlines operations, simplifies data management, and enables businesses to make data-driven decisions based on real-time insights.
                  </p>
                </div>
              </div>

              <div className="headContainer">
                <div className="headIcon">
                  <i
                  
                    onClick={handleToggle4}
                    class={
                      
                      toggle4
                        ? "fa-solid fa-chevron-down icon1 "
                        : "fa-solid fa-chevron-up icon2 "
                    }
                  ></i>
                  <h1 onClick={handleToggle4}>
                  WHAT ARE THE BENEFITS OF INTEGRATING A "TIMETRAKER" WITH OTHER BUSINESS TOOLS?
                  </h1>
                </div>
                <div
                  className="Para"
                  style={{ display: toggle4 ? "none" : "block" }}
                >
                  <p>
                  yes, it is secure and private time "TIMETRAKER" software.
                  </p>
                </div>
              </div>

              <div className="headContainer">
                <div className="headIcon">
                  <i
                    onClick={handleToggle5}
                    class={
                      toggle5
                        ? "fa-solid fa-chevron-down icon1 "
                        : "fa-solid fa-chevron-up icon2 "
                    }
                  ></i>
                  <h1 onClick={handleToggle5}>
                  IS TIME "TIMETRAKER" SOFTWARE SECURE AND PRIVATE?
                  </h1>
                </div>
                <div
                  className="Para"
                  style={{ display: toggle5 ? "none" : "block" }}
                >
                  <p>
                  Generating reports and analyzing time "TIMETRAKER" data is an essential part of the process. It helps you gain insights into how time is allocated, assess productivity, and make informed decisions.
                  </p>
                </div>
              </div>

              <div className="headContainer">
                <div className="headIcon">
                  <i
                  
                    onClick={handleToggle6}
                    class={
                      toggle6
                        ? "fa-solid fa-chevron-down icon1 "
                        : "fa-solid fa-chevron-up icon2 "
                    }
                  ></i>
                  <h1 onClick={handleToggle6}>
                  Yes, we can incorporate SEO best practices into the website development process to help improve your site's visibility on search engines.
                  </h1>
                </div>
                <div
                  className="Para"
                  style={{ display: toggle6 ? "none" : "block" }}
                >
                  <p>
                  Yes, we can incorporate SEO best practices into the website development process to help improve your site's visibility on search engines.
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

export default Faq;
