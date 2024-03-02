import React, { useState, useEffect, useContext } from "react";
import "./Task.css";
import signupImg1 from "../../img/Vector.png";
import signupImg2 from "../../img/user2.png";
import { Col, Container, Row, Button, Form } from "react-bootstrap";
import axios from "axios";
import AdminLayout from "../../hoc/AdminLayout";
import EditAccessibilityTable from "../../components/EditAccessibilityTable";
import { MyContext } from "../../context/MyProvider";
import { useNavigate } from "react-router-dom";

const Task = () => {
  const navigate = useNavigate();
  const { sideBarStatus, setSideBarStatus } = useContext(MyContext);

  const handleClick = () => {
    if (sideBarStatus == true) {
      setSideBarStatus(false);
    } else {
      setSideBarStatus(true);
    }
  };

  const screenWidth = window.innerWidth;
  if (screenWidth >= 840) {
    var forPhoneScreenNoDisplay = true;
  } else {
    var forPhoneScreenNoDisplay = false;
  }




  return (
    <AdminLayout>
      <div
        className={sideBarStatus ? "content_right_dashboard" : "none"}
        fluid
        style={
          (sideBarStatus == true) & (forPhoneScreenNoDisplay == false)
            ? { display: "none" }
            : { display: "block", minHeight: "100vh", background: "#f1f1f1" }
        }
      >
        <Container fluid className="dash3" style={{ padding: "0" }}>
          {/* Row 1 */}
          <Row>
            <Col className="task-container">
              <div
                className="hamburgar"
                style={
                  sideBarStatus ? { display: "none" } : { display: "block" }
                }
              >
                <i onClick={handleClick} className="fas fa-bars"></i>
              </div>
              <div className="task-top">
                <div className="task-header1">
                  <h5 style={
                      sideBarStatus == true
                        ? { paddingLeft: "10px", paddingTop: "2px" }
                        : { paddingLeft: "60px", paddingTop: "4px" }
                    }>Role Preference</h5>
                </div>

                <div className="task-header2">
                  <abbr title="?" ><img src={signupImg1} alt="" /></abbr>
                  <abbr title="Profile"><img
                    onClick={() => {
                      navigate("/profile");
                    }}
                    src={signupImg2}
                    alt=""
                  /></abbr>
                </div>
              </div>
            </Col>
          </Row>

          <div>
            <div
              style={{
                // background: "white",
                borderRadius: "40px",
                display: "flex",
                flexDirection: "column",
                // minHeight: "90vh",
              }}
            >
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  margin: "40px 0px 20px 0px",
                }}
              >
                <p
                  style={{
                    widthL: "200px",
                    background: "#64e48e",
                    borderRadius: "15px",
                    color: "#000",
                    padding: "10px 15px",
                    cursor: "context-menu",
                    fontWeight: '500',
                    fontSize: '20px',
                    fontFamily: 'Inter'
                  }}
                >
                  Setup Your Accessibilty
                </p>
              </div>
              <Row>
                <Col>
                  <div className="table-container">
                    <EditAccessibilityTable />
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </Container>
      </div>
    </AdminLayout>
  );
};

export default Task;
