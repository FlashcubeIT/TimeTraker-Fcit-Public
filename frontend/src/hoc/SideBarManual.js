import React, { useContext } from 'react';
import { Box } from '@mui/material';
import { StyledSideDiv, StyledListItemLog, ListStyled, StyledTypography, StyledListItem, StyledLogo } from './Styled';
import { useNavigate } from 'react-router-dom';
import './Style.css'
import { MyContext } from '../context/MyProvider'
import logo from "../img/logoUpdated.svg"


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

    const navigate = useNavigate();
    const Timer = () => {
        navigate('/timer-manual');
    };
    const dailyTimeSheet = () => {
        navigate('/daily-timesheet-manual');
    };
    const weeklyTimesheet = () => {
        navigate('/weekly-manual');
    };
    const calender = () => {
        navigate('/calender-manual');
    };
    const Dashboard = () => {
        navigate('/dashboard-manual');
    };
    const ProjectManual = () => {
        navigate('/project-manual');
    };
    const ImportManual = () => {
        navigate('/import-manual');
    };
    const AddUser = () => {
        navigate('/add-user-manual');
    };
    const TimeSheetAprover = () => {
        navigate('/approve-timesheet-manual');
    };
    const ExportManual = () => {
        navigate('/export-manual');
    };
    const quickbooks = () => {
        navigate('/quickbooks-manual');
    };
    const TaskManual = () => {
        navigate('/task-manual');
    }
    const ReportManual = () => {
        navigate('/report-manual');
    }
    const AproveExpenseManual = () => {
        navigate('/aprove-expense-manual');
    }
    const expenseManual = () => {
        navigate('/expense-manual');
    }
    return (
        <StyledSideDiv className={sideBarStatus ? "active" : "leftdash1"} style={sideBarStatus == true & forPhoneScreenNoDisplay == false ? { width: '100%' } : {}}>


            <div >
                <Box height="100%" display="flex" flexDirection="column">
                    <Box>
                        <ListStyled>
                            <StyledListItemLog>
                                <StyledLogo variant="h5" sx={{ color: 'white', fontSize: '48px', marginBottom: "0" }}>
                                    <img className='logo_img' src={logo} alt='logo' />
                                </StyledLogo>
                                <div onClick={handleClick}>
                                    <i style={{ color: 'white', marginBottom: '30px', fontSize: '25px', cursor: 'pointer', paddingTop: "8px" }} className='fas fa-bars'></i>
                                </div>
                            </StyledListItemLog>
                            <StyledListItem className='hoc_parent' sx={{ borderBottom: "1px solid gray" }} >

                                <StyledTypography style={{ fontSize: "25px", margin: "0", color: "#76cb38" }} className='hoc_text' variant="h5" cursor="pointer" onClick={dailyTimeSheet}>
                                    User Manual
                                </StyledTypography>
                            </StyledListItem>
                            <StyledListItem className='hoc_parent' >

                                <StyledTypography className='hoc_text' variant="h5" cursor="pointer" onClick={dailyTimeSheet}>
                                    Daily Timehseet
                                </StyledTypography>
                            </StyledListItem>
                            <StyledListItem className='hoc_parent' >

                                <StyledTypography className='hoc_text' cursor="pointer" variant="h5" onClick={Timer}  >
                                    Timer
                                </StyledTypography>
                            </StyledListItem>



                            <StyledListItem className='hoc_parent' >

                                <StyledTypography className='hoc_text' variant="h5" onClick={weeklyTimesheet}  >
                                    Weekly Timehseet
                                </StyledTypography>
                            </StyledListItem>



                            <StyledListItem className='hoc_parent' >

                                <StyledTypography className='hoc_text' onClick={calender} variant="h5" >
                                    Calender
                                </StyledTypography>
                            </StyledListItem>

                            <StyledListItem className='hoc_parent' >

                                <StyledTypography className='hoc_text' onClick={Dashboard} variant="h5" >
                                    Dashboard
                                </StyledTypography>
                            </StyledListItem>


                            <StyledListItem className='hoc_parent' >

                                <StyledTypography className='hoc_text' onClick={ProjectManual} variant="h5"  >
                                    Projects
                                </StyledTypography>
                            </StyledListItem>



                            {/* <StyledListItem style={reports}>
                                <StyledTypography onClick={Reports} variant="h5">
                                    Report
                                </StyledTypography>
                            </StyledListItem> */}



                            <StyledListItem className='hoc_parent' >

                                <StyledTypography style={{ paddingLeft: '2px' }} className='hoc_text' onClick={AddUser} variant="h5">
                                    Add User
                                </StyledTypography>
                            </StyledListItem>

                            <StyledListItem className='hoc_parent' >

                                <StyledTypography className='hoc_text' onClick={TimeSheetAprover} variant="h5"  >
                                    Aprove Timesheet
                                </StyledTypography>
                            </StyledListItem>

                            <StyledListItem className='hoc_parent' >

                                <StyledTypography className='hoc_text' onClick={quickbooks} variant="h5" >
                                    QuickBooks
                                </StyledTypography>
                            </StyledListItem>

                            <StyledListItem className='hoc_parent' sx={{ borderBottom: "1px solid gray" }} >

                                <StyledTypography style={{ fontSize: "25px", margin: "0", color: "#76cb38" }} className='hoc_text' variant="h5" cursor="pointer" onClick={dailyTimeSheet}>
                                    Additional
                                </StyledTypography>
                            </StyledListItem>
                            <StyledListItem className='hoc_parent' >

                                <StyledTypography className='hoc_text' onClick={TaskManual} variant="h5" >
                                    Task
                                </StyledTypography>
                            </StyledListItem>
                            <StyledListItem className='hoc_parent' >

                                <StyledTypography className='hoc_text' onClick={expenseManual} variant="h5" >
                                    Expenses
                                </StyledTypography>
                            </StyledListItem>
                            <StyledListItem className='hoc_parent' >

                                <StyledTypography className='hoc_text' onClick={AproveExpenseManual} variant="h5" >
                                    Expenses Aprove
                                </StyledTypography>
                            </StyledListItem>
                            <StyledListItem className='hoc_parent' >

                                <StyledTypography className='hoc_text' onClick={ReportManual} variant="h5" >
                                    Report
                                </StyledTypography>
                            </StyledListItem>
                            <StyledListItem className='hoc_parent' >

                                <StyledTypography className='hoc_text' onClick={ExportManual} variant="h5" >
                                    Export
                                </StyledTypography>
                            </StyledListItem>
                            <StyledListItem className='hoc_parent' >

                                <StyledTypography className='hoc_text' onClick={ImportManual} variant="h5" >
                                    Import
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
