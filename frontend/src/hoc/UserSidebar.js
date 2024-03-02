import React from 'react';
import { Box, Typography } from '@mui/material';
import { StyledSideDiv, ListStyled, StyledTypography, StyledListItem } from './Styled';
import { useNavigate } from 'react-router-dom';

const UserSideBar = () => {
    const navigate = useNavigate();
    const Expenses = () => {
        navigate('/user-expense');
    };
    const TimeSheet = () => {
        navigate('/user-dashboard');
    };
    const Profile = () => {
        navigate('/user-profile');
    };
    return (
        <StyledSideDiv>
            <Box height="100%" display="flex" flexDirection="column">
                <Box>
                    <ListStyled>
                        <StyledListItem>
                            <Typography variant="h4" sx={{ color: 'white', fontSize: '48px' }}>
                                Tsheet
                            </Typography>
                        </StyledListItem>
                        <StyledListItem>
                            <StyledTypography variant="h5" cursor="pointer" onClick={TimeSheet}>
                                My Time
                            </StyledTypography>
                        </StyledListItem>
                        <StyledListItem>
                            <StyledTypography cursor="pointer" variant="h5" onClick={Expenses}>
                                My Expenses
                            </StyledTypography>
                        </StyledListItem>
                        <StyledListItem>
                            <StyledTypography onClick={Profile} variant="h5">
                                Profile
                            </StyledTypography>
                        </StyledListItem>
                    </ListStyled>
                </Box>
            </Box>
        </StyledSideDiv>
    );
};

export default UserSideBar;
