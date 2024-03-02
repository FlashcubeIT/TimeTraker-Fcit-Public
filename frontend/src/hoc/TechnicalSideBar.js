import React, { useContext } from 'react';
import { Box } from '@mui/material';
import { StyledSideDiv, StyledListItemLog, ListStyled, StyledTypography, StyledListItem, StyledLogo } from './Styled';
import { useNavigate } from 'react-router-dom';
import './Style.css'
import { MyContext } from '../context/MyProvider'
import logo from "../img/logoUpdated.svg"


const TechnicalSideBar = () => {
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

    const TechnicalDoc = () => {
        navigate('/technical-doc');
    };

    const BackendFile = () => {
        navigate('/backend-file-stuc');
    };

    const FrontendFile = () => {
        navigate('/frontend-file-stuc');
    };

    const ServerFile = () => {
        navigate('/node-server-file-stuc');
    };

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

                                <StyledTypography style={{ fontSize: "25px", margin: "0", color: "#76cb38" }} className='hoc_text' variant="h5" cursor="pointer" onClick={TechnicalDoc}>
                                    User Manual
                                </StyledTypography>
                            </StyledListItem>
                            <StyledListItem className='hoc_parent' >

                                <StyledTypography className='hoc_text' variant="h5" cursor="pointer" onClick={TechnicalDoc}>
                                    Technical Doc
                                </StyledTypography>
                            </StyledListItem>

                            <StyledListItem className='hoc_parent' sx={{ borderBottom: "1px solid gray" }} >

                                <StyledTypography style={{ fontSize: "25px", margin: "0", color: "#76cb38" }} className='hoc_text' variant="h5" cursor="pointer" onClick={BackendFile}>
                                    File Structure
                                </StyledTypography>
                            </StyledListItem>

                            <StyledListItem className='hoc_parent' >

                                <StyledTypography className='hoc_text' variant="h5" cursor="pointer" onClick={BackendFile}>
                                    Backend
                                </StyledTypography>
                            </StyledListItem>

                            <StyledListItem className='hoc_parent' >

                                <StyledTypography className='hoc_text' variant="h5" cursor="pointer" onClick={FrontendFile}>
                                    Frontend
                                </StyledTypography>
                            </StyledListItem>

                            <StyledListItem className='hoc_parent' >

                                <StyledTypography className='hoc_text' variant="h5" cursor="pointer" onClick={ServerFile}>
                                    Node Server
                                </StyledTypography>
                            </StyledListItem>

                        </ListStyled>
                    </Box>
                </Box>
            </div>
        </StyledSideDiv>

    );
};

export default TechnicalSideBar;
