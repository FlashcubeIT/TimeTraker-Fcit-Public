import React, { useState, useContext } from 'react';
import { Box, Typography } from '@mui/material';
import { StyledSideDiv, StyledListItemLog, ListStyled, StyledTypography, StyledListItem, StyledLogo } from './Styled';
import { useNavigate } from 'react-router-dom';
import './Style.css'
import { MyContext } from '../context/MyProvider'
import logo from "../img/logoUpdated.svg"
import icon1 from '../img/icon 1.png'
import icon2 from '../img/icon 2.png'
import icon3 from '../img/icon 3.png'
import icon4 from '../img/icon 4.png'
import icon5 from '../img/icon 5.png'
import icon6 from '../img/icon 6.png'
import icon7 from '../img/icon 7.png'
import icon8 from '../img/icon 8.png'
import icon9 from '../img/icon 9.png'
import icon10 from '../img/icon 10.png'
import icon11 from '../img/icon 11.png'

const SideBar = () => {
    const { sideBarStatus, setSideBarStatus } = useContext(MyContext);

    const handleClick = () => {
        if (sideBarStatus == true) {
            setSideBarStatus(false)
        } else {
            setSideBarStatus(true)
        }
    }

    const screenWidth = window.innerWidth;
    if (screenWidth >= 840) {
        var forPhoneScreenNoDisplay = true
    } else {
        var forPhoneScreenNoDisplay = false
    }



    var myTimesheets = { display: 'none' }
    var task = { display: 'none' }
    var myExpenses = { display: 'none' }
    var project = { display: 'none' }
    var dashboard = { display: 'none' }
    var role = { display: 'none' }
    var reports = { display: 'none' }
    var profile = { display: 'none' }
    var employe = { display: 'none' }
    var timesheets = { display: 'none' }
    var expenses = { display: 'none' }
    var sync = { display: 'none' }
    const adminloginInfo = JSON.parse(localStorage.getItem('adminLoginInfo'));
    const userLoginInfo = JSON.parse(localStorage.getItem('userLoginInfo'));
    //   console.log("adminloginInfo==========>", adminloginInfo)
    if (adminloginInfo) {
        var homeData = (adminloginInfo)
    }
    else if (userLoginInfo) {
        var homeData = (userLoginInfo)
    }

    if (homeData?.accessibility?.myTimesheets === true) {
        myTimesheets = { display: 'flex' }
    }
    if (homeData?.accessibility?.task === true) {
        task = { display: 'flex' }
    }
    if (homeData?.accessibility?.myExpenses === true) {
        myExpenses = { display: 'flex' }
    }
    if (homeData?.accessibility?.project === true) {
        project = { display: 'flex' }
    }
    if (homeData?.accessibility?.dashboard === true) {
        dashboard = { display: 'flex' }
    }
    if (homeData?.accessibility?.role === true) {
        role = { display: 'flex' }
    }
    if (homeData?.accessibility?.reports === true) {
        reports = { display: 'flex' }
    }
    if (homeData?.accessibility?.profile === true) {
        profile = { display: 'flex' }
    }
    if (homeData?.accessibility?.employe === true) {
        employe = { display: 'flex' }
    }
    if (homeData?.accessibility?.timesheets === true) {
        timesheets = { display: 'flex' }
    }
    if (homeData?.accessibility?.expenses === true) {
        expenses = { display: 'flex' }
    }
    if (homeData?.accessibility?.sync === true) {
        sync = { display: 'flex' }
    }

    const navigate = useNavigate();
    const Expenses = () => {
        navigate('/my-expense');
    };
    const TimeSheet = () => {
        navigate('/my-time');
    };
    const Task = () => {
        navigate('/task');
    };
    const Project = () => {
        navigate('/project');
    };
    const Dashboard = () => {
        navigate('/admin-dashboard-v2');
    };
    const Roles = () => {
        navigate('/accessibility');
    };
    const Reports = () => {
        navigate('/reports');
    };
    const Profile = () => {
        navigate('/profile');
    };
    const AddUser = () => {
        navigate('/add-user');
    };
    const TimeSheetAprover = () => {
        navigate('/timesheet-aprove');
    };
    const ExpenseAprover = () => {
        navigate('/expense-aprove');
    };
    const TimesheetReport = () => {
        navigate('/timesheet-reports');
    };

    const ExpenseReport = () => {
        navigate('/expense-reports');
    };
    const quickbooks = () => {
        navigate('/quickbooks');
    };

    return (
        <StyledSideDiv className={sideBarStatus ? "active" : "leftdash1"} style={sideBarStatus == true & forPhoneScreenNoDisplay == false ? { width: '100%' } : {}}>


            <div >
                <Box height="100%" display="flex" flexDirection="column">
                    <Box>
                        <ListStyled>
                            <StyledListItemLog>
                                <StyledLogo variant="h5" sx={{ color: 'white', fontSize: '48px' }}>
                                    <img className='logo_img' src={logo} alt='logo' />
                                </StyledLogo>
                                <div onClick={handleClick}>
                                    <i style={{ color: 'white', marginBottom: '30px', fontSize: '25px', cursor: 'pointer', paddingTop: "8px" }} className='fas fa-bars'></i>
                                </div>
                            </StyledListItemLog>
                            <StyledListItem className='hoc_parent' style={myTimesheets}>
                                <div>
                                    <img style={{width: "30px", marginLeft: "-3px"}} className='side_bar_icons' src={icon1} alt='logo' />
                                </div>
                                <StyledTypography className='hoc_text' variant="h5" cursor="pointer" onClick={TimeSheet}>
                                    My Time
                                </StyledTypography>
                            </StyledListItem>
                            <StyledListItem className='hoc_parent' style={myExpenses}>
                                <div>
                                    <img className='side_bar_icons' src={icon2} alt='logo' />
                                </div>
                                <StyledTypography className='hoc_text' cursor="pointer" variant="h5" onClick={Expenses} style={{ paddingLeft: '3px' }} >
                                    My Expenses
                                </StyledTypography>
                            </StyledListItem>



                            <StyledListItem className='hoc_parent' style={task}>
                                <div>
                                    <img className='side_bar_icons' src={icon3} alt='logo' />
                                </div>
                                <StyledTypography className='hoc_text' variant="h5" onClick={Task} style={{ paddingLeft: '4px' }} >
                                    Task
                                </StyledTypography>
                            </StyledListItem>



                            <StyledListItem className='hoc_parent' style={project}>
                                <div>
                                    <img style={{ width: "25px" }} className='side_bar_icons' src={icon4} alt='logo' />
                                </div>
                                <StyledTypography className='hoc_text' onClick={Project} variant="h5" style={{ paddingLeft: '2px' }} >
                                    Project
                                </StyledTypography>
                            </StyledListItem>

                            <StyledListItem className='hoc_parent' style={dashboard}>
                                <div>
                                    <img className='side_bar_icons' src={icon5} alt='logo' />
                                </div>
                                <StyledTypography className='hoc_text' onClick={Dashboard} variant="h5" style={{ paddingLeft: '3px' }} >
                                    Dashboard
                                </StyledTypography>
                            </StyledListItem>


                            <StyledListItem className='hoc_parent' style={role}>
                                <div>
                                    <img style={{width: "21px"}} className='side_bar_icons' src={icon6} alt='logo' />
                                </div>
                                <StyledTypography className='hoc_text' onClick={Roles} variant="h5" style={{ paddingLeft: '6px' }} >
                                    Role
                                </StyledTypography>
                            </StyledListItem>



                            {/* <StyledListItem style={reports}>
                                <StyledTypography onClick={Reports} variant="h5">
                                    Report
                                </StyledTypography>
                            </StyledListItem> */}

                            <StyledListItem className='hoc_parent' style={profile}>
                                <div>
                                    <img style={{ width: "22px" }} className='side_bar_icons' src={icon7} alt='logo' />
                                </div>
                                <StyledTypography className='hoc_text' onClick={Profile} variant="h5" style={{ paddingLeft: '5px' }} >
                                    Profile
                                </StyledTypography>
                            </StyledListItem>

                            <StyledListItem className='hoc_parent' style={employe}>
                                <div>
                                    <img style={{ width: "30px", marginLeft: "-4px" }} className='side_bar_icons' src={icon8} alt='logo' />
                                </div>
                                <StyledTypography style={{ paddingLeft: '2px' }} className='hoc_text' onClick={AddUser} variant="h5">
                                    Add User
                                </StyledTypography>
                            </StyledListItem>

                            <StyledListItem className='hoc_parent' style={timesheets}>
                                <div>
                                    <img style={{width: "25px" , marginLeft:"-4px"}} className='side_bar_icons' src={icon9} alt='logo' />
                                </div>
                                <StyledTypography className='hoc_text' onClick={TimeSheetAprover} variant="h5" style={{ paddingLeft: '7px' }} >
                                    Timesheet
                                </StyledTypography>
                            </StyledListItem>

                            <StyledListItem className='hoc_parent' style={expenses}>
                                <div>
                                    <img style={{width:"24px"}} className='side_bar_icons' src={icon10} alt='logo' />
                                </div>
                                <StyledTypography className='hoc_text' onClick={ExpenseAprover} variant="h5" style={{ paddingLeft: '3px' }} >
                                    Expense
                                </StyledTypography>
                            </StyledListItem>



                            <StyledListItem className='hoc_parent' style={sync}>
                                <div>
                                    <img style={{width:"24px"}} className='side_bar_icons' src={icon6} alt='logo' />
                                </div>
                                <StyledTypography className='hoc_text' onClick={quickbooks} variant="h5" style={{ paddingLeft: '3px' }} >
                                    QuickBooks
                                </StyledTypography>
                            </StyledListItem>

                            {/* have to change if needed */}
                            {/* <StyledListItem style={reports}>
                                <StyledTypography onClick={TimesheetReport} variant="h5">
                                    Report
                                </StyledTypography>
                            </StyledListItem> */}

                            <StyledListItem className='hoc_parent' style={reports} class="dropdown">
                                <div>
                                    <img style={{width:"24px"}} className='side_bar_icons' src={icon11} alt='logo' />
                                </div>
                                <StyledTypography class="dropdown dropdown-5 hoc_text" style={{ paddingLeft: '15px' }}>
                                    Report
                                    <i style={{ marginLeft: '15px', fontSize: '15px' }} class="fa-solid fa-circle-chevron-down"></i>
                                    <ul class="dropdown_menu dropdown_menu-5">
                                        <li onClick={TimesheetReport} class="dropdown_item-1 li_items hoc_parent1 "><i style={{ marginRight: '6px', fontSize: '6px' }} class="fa-regular fa-circle"></i>Timesheet Report</li>
                                        <li onClick={ExpenseReport} class="dropdown_item-2 li_items hoc_parent2 "><i style={{ marginRight: '6px', fontSize: '6px' }} class="fa-regular fa-circle"></i>Expense Report</li>
                                    </ul>
                                </StyledTypography>
                            </StyledListItem>




                        </ListStyled>
                    </Box>
                </Box>
            </div>
        </StyledSideDiv>

    );
};

export default SideBar;
